from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.models import User as authenticate
from django.contrib.auth.forms import UserCreationForm

#
# class User(AbstractUser):
#     class Meta:
#         db_table = 'users'
#         verbose_name = "Пользователь"
#         verbose_name_plural = "Пользователи"
#         permissions = \
#             (
#             ("add_logentry"), ('add_user'), ("add_session"), ("add_order"), ("change_user"), ("change_session"), ("change_order"),
#             ("delete_session"), ("view_user"), ("view_product"), ("view_categorie"), ("view_user"), ("view_order"), ('create_user'),
#             ('update_user'),
#         )


class Categorie(models.Model):
    class Meta:
        db_table = 'categories'
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    name = models.CharField(max_length=100)
    active = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    parent_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    class Meta:
        db_table = 'products'
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    category_id = models.IntegerField()
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, null=True, blank=True)
    price = models.IntegerField()
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
    products = models.JSONField(default=dict)  # product_id + quantity
    # quantity = models.IntegerField()
    status = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
