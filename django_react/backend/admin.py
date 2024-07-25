from django.contrib import admin

from .models import Categorie, Order, Product


class CategorieAdmin(admin.ModelAdmin):
    list_display = ('name', 'active')

class OrderAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'status')

class OrderProductAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'product_id', 'quantity')



class ProductAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'name', 'description', 'price')


admin.site.register(Categorie, CategorieAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(Product, ProductAdmin)
