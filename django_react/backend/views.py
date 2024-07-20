import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, requires_csrf_token, csrf_protect, csrf_exempt
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
from .models import Categorie, Product


def json_login_required(view_func):
    def wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Вы не авторизованы'}, status=401)
        return view_func(request, *args, **kwargs)

    return wrapped_view


# Создаёт уникальный CSRF-токен и вставляет в cookie браузеру
def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # Получаем данные из запроса
        data = request.data
        serial = UserRegisterSerializer(data=data)
        # is_authenticated()

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
        return Response({'user': ser.data}, status=status.HTTP_200_OK)


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
