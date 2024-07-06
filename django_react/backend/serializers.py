from django.contrib.auth.hashers import make_password, check_password
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model, authenticate


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, valedated_data):
        user = User(username=valedated_data['username'],
                    password=make_password(valedated_data['password']),
                    email=valedated_data['email'])
        user.save()
        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    password = serializers.CharField(max_length=128, write_only=True)

    def check(self, req, valedated_data):
        us = User.objects.get(username=valedated_data['username'])
        checks = check_password(valedated_data['password'], us.password)
        if checks:
            user = authenticate(requests=req, username=valedated_data['username'],
                                password=valedated_data['password'])
            return user
        else:
            raise serializers.ValidationError('Неправильный логин или пароль')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model: User
        fields = ('email', 'username',)
#
# class UserDataSerializer(serializers.ModelSerializer):
#     class Meta:
#         model: User
#
#     def check(request):
#
