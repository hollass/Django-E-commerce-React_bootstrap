from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.models import User as authenticate
from django.contrib.auth.forms import UserCreationForm
class Categorie(models.Model):
    class Meta:
        db_table = 'categories'
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    name = models.CharField(max_length=100)
    info = models.JSONField(default=dict, unique=True)  # url + query + shard

    active = models.IntegerField()
    sorted_at = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    parent_id = models.IntegerField(null=True, blank=True)
    # url = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    class Meta:
        db_table = 'products'
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    category_id = models.IntegerField()
    rating = models.FloatField(null=True, blank=True)
    name = models.CharField(max_length=120)
    description = models.JSONField(default=dict, unique=True)
    price = models.JSONField(default=dict)
    image = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    class Meta:
        db_table = 'orders'
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"

    user_id = models.IntegerField()
    status = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class OrderProduct(models.Model):
    class Meta:
        db_table = 'order_product'
        verbose_name = "Товар в заказе"
        verbose_name_plural = "Товары в заказах"

    order_id = models.IntegerField(default=0)
    product_id = models.IntegerField(default=0)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)


class Like(models.Model):
    class Meta:
        db_table = 'like'
        verbose_name = "Избранные"
        verbose_name_plural = "Избранные"

    user_id = models.IntegerField()
    products = models.JSONField(default=dict)  # product_id + quantity
    # quantity = models.IntegerField()
    status = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

