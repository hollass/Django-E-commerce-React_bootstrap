import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.http import require_POST
from django.contrib.sessions.models import Session
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions, status
from django.contrib.auth.models import User

from .parser.parser import WildParser
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer
from .models import Categorie, Product, Order, OrderProduct


def json_login_required(view_func):
    def wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Вы не авторизованы'}, status=401)
        return view_func(request, *args, **kwargs)

    return wrapped_view


def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        data = request.data
        serial = UserRegisterSerializer(data=data)

        if serial.is_valid():
            user = serial.create(data)
            user = authenticate(username=data['username'], password=data['password'])
            login(request, user)
            return Response(serial.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        ser = UserLoginSerializer(data=data)
        if ser.is_valid(raise_exception=True):
            user = ser.check(request, data)
            login(request, user)

            return Response(ser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_info(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True, 'name': request.user.name})

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        ser = UserProfileSerializer(request.user)
        data = json.loads(request.body)
        return Response({'user': ser.data, 'user_id':get_user(data[''])}, status=status.HTTP_200_OK)

@require_POST
def register_view(request):
    data = json.loads(request.body)

    name = data.get('name')
    password = data.get('password')
    phone = data.get('phone')
    logins = phone

    role = 0
    hashed = password

    user = User(name=name, login=logins, password=password, phone=phone, role=role, hashed_password=hashed)
    user.save()
    user = authenticate(username=logins, password=password)

    # Создаётся сессия. session_id отправляется в куки
    session = Session.objects.create()
    session.save()

    return JsonResponse({'detail': 'Успешная регистрация'})

def get_user(username):
    user = User.objects.get(username=username)
    return user.id

wild = WildParser()

@api_view(['POST'])
@permission_classes([AllowAny])
def cats_view(request):
    data = []
    parents = Categorie.objects.all().filter(parent_id=None)
    for i in parents:
        data.append(
            {'id': i.id,
             'name': i.name,
             'query': i.info['query'],
             'shard': i.info['shard'],
             'url': i.info['url']
             }
        )

    return Response({'data': data}, status=status.HTTP_200_OK)

def add_cat(data: []):
    a = +1
    if a == 1:
        for item in data:
            try:
                parent = Categorie(
                    name=item['name'],
                    info={'url': item['url'], 'query': item['query'], 'shard': item['shard']},
                    active=1,

                )
                parent.save()
                for i in item['childs']:
                    cat = Categorie(
                        name=i['name'],
                        info={'url': i['url'], 'query': i['query'], 'shard': i['shard']},
                        active=1,
                        parent_id=parent.id,
                    )
                    cat.save()

            except:
                pass

@api_view(['POST'])
@permission_classes([AllowAny])
def cat_view(request):
    request_data = request.data
    url = '/catalog'
    for i in request_data['url']:
        if i == None:
            break
        url += '/' + i

    page = request_data['page']

    url = Categorie.objects.get(info__url=url)
    if request_data['url'][1] == None:
        url = Categorie.objects.filter(parent_id=url.id)[0]

    prod = Product.objects.filter(category_id=url.id).values_list('description__id', flat=True).distinct(
        'description__id')[page * 24 - 24:page * 24]
    data = []
    for item in prod:
        item = Product.objects.filter(description__id=item)[0]
        data.append(
            {'id': item.description["id"],
             'name': item.name,
             'description': {'brand': item.description['brand'],
                             'name': item.description['name']},
             'price': item.price,
             'rating': item.rating,

             }
        )

    return Response({'data': data}, status=status.HTTP_200_OK)

def add_product():
    cats = Categorie.objects.all()

    for i in cats:
        try:
            cat = Categorie(id=i.id)
            data = wild.get_all_products_in_category(1,
                                                     {
                                                         'query': i.info['query'],
                                                         'shard': i.info['shard']
                                                     })
            data = data['data']['products']
            for item in data:
                for j in item['sizes']:
                    try:
                        product = Product(
                            category_id=cat.id,
                            rating=item['reviewRating'],
                            name=item['name'],
                            description={
                                'id': item['id'],
                                'brand': item['brand'],
                                'name': j['name']
                            },
                            price=j['price']
                        )

                        print(f'Product add {item["name"]}')

                        product.save()
                    except:
                        pass
        except:
            pass

@api_view(['POST'])
@permission_classes([AllowAny])
def add_cart(request):
    data = request.data
    print(data)
    user = User.objects.get(username = data['user'])
    try:
        cart = Order.objects.get(user_id=user.id, status=1)
    except:
        cart = Order(
            user_id=user.id,
            status=1
        )
        cart.save()

    if data['cart'] == 1:
        product = Product.objects.filter(description__id=data['product'])[0]

        order_product = OrderProduct(
            order_id=cart.id,
            product_id=product.description['id']
        )
        order_product.save()
        return Response({'detail': 'Продукт добавлен в корзину'}, status=status.HTTP_200_OK)
    elif data['cart'] == 2:
        print(data['product'])
        for product in data['product']:
            id = OrderProduct.objects.get(product_id = product['id'],order_id=cart.id)
            id.quantity = (int(product['count']))
            id.save()
        cart.status = 2
        cart.save()
        return Response({'detail': 'Заказ создан'}, status=status.HTTP_200_OK)
    elif data['cart'] == 0:
        try:
            cart = Order.objects.get(user_id=user.id, status = 2)
            cart.status = 0
            cart.save()
            return Response({'detail': 'Заказ отменен'}, status=status.HTTP_200_OK)
        except:
            return Response({'detail': 'Заказ не найден'}, status=status.HTTP_404_NOT_FOUND)




@api_view(['POST'])
@permission_classes([AllowAny])
def view_cart(request):
    data = request.data
    user = User.objects.get(username = data['user'])
    cart = Order.objects.get(user_id=user.id, status = 1)
    if cart:
        order_products = OrderProduct.objects.filter(order_id=cart.id)
        data = []
        for i in order_products:
            product = Product.objects.filter(description__id=i.product_id)[0]
            data.append(
                {'id': product.description["id"],
                 'name': product.name,
                 'description': {'brand': product.description['brand'],
                             'name': product.description['name']},
                 'price': product.price['product'],
                 'count': 1
                 }
            )
        return Response({'data': data}, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Корзина пуста'}, status=status.HTTP_404_NOT_FOUND)