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
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserProfileSerializer


# Декоратор для выдачи ошибки если пользователь неавторизован
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

    return JsonResponse({'detail': 'Успешная регистрация', 'session_id': session.session_id})

