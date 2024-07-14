import json
from datetime import date
from os import path

import pandas as pd
import requests


class WildParser:

    def __init__(self):
        self.headers = {'Accept': "*/*",
                        'User-Agent': "Chrome/51.0.2704.103 Safari/537.36"}
        self.run_date = date.today()
        self.product_cards = []
        self.directory = path.dirname(__file__)

    def download_current_catalogue(self) -> str:

        url = ('https://static-basket-01.wb.ru/vol0/data/'
               'main-menu-ru-ru-v2.json')
        response = requests.get(url, headers=self.headers).json()
        return response

    def traverse_json(self, parent_category: list, flattened_catalogue: list):

        for category in parent_category:
            try:
                flattened_catalogue.append({
                    'name': category['name'],
                    'url': category['url'],
                    'shard': category['shard'],
                    'query': category['query']
                })
            except KeyError:
                continue
            if 'childs' in category:
                self.traverse_json(category['childs'], flattened_catalogue)

    def process_catalogue(self, local_catalogue_path: str) -> list:

        catalogue = []
        with open(local_catalogue_path, 'r') as my_file:
            self.traverse_json(json.load(my_file), catalogue)
        return catalogue

    def extract_category_data(self, catalogue: list, user_input: str) -> tuple:

        for category in catalogue:
            if (user_input.split("https://www.wildberries.ru")[-1]
                    == category['url'] or user_input == category['name']):
                return category['name'], category['shard'], category['query']

    def get_products_on_page(self, page_data: dict) -> list:
        print(page_data)
        if page_data:
            products_on_page = []
            for item in page_data['data']['products']:
                products_on_page.append({
                    'Ссылка': f"https://www.wildberries.ru/catalog/"
                              f"{item['id']}/detail.aspx",
                    'Артикул': item['id'],
                    'Наименование': item['name'],
                    'Бренд': item['brand'],
                    'ID бренда': item['brandId'],
                    'Цена': int(item['priceU'] / 100),
                    'Цена со скидкой': int(item['salePriceU'] / 100),
                    'Рейтинг': item['rating'],
                    'Отзывы': item['feedbacks']
                })
            return products_on_page
        else:
            pass

    def add_data_from_page(self, url: str):

        response = requests.get(url, headers=self.headers).json()
        page_data = self.get_products_on_page(response)
        if len(page_data) > 0:
            self.product_cards.extend(page_data)
            print(f"Добавлено товаров: {len(page_data)}")
        else:
            print('Загрузка товаров завершена')
            return True

    def get_all_products_in_category(self, category_data: tuple):

        for page in range(1, 50):
            print(f"Загружаю товары со страницы {page}")
            url = (f"https://catalog.wb.ru/catalog/{category_data[1]}/v2/"
                   f"catalog?ad_testing=false&appType=1&{category_data[2]}&curr=rub"
                   f"&dest=-1785058&page={page}&sort=popular&spp=30")
            if self.add_data_from_page(url):
                break

    def get_sales_data(self):

        for card in self.product_cards:
            url = (f"https://product-order-qnt.wildberries.ru/by-nm/"
                   f"?nm={card['Артикул']}")
            try:
                response = requests.get(url, headers=self.headers).json()
                card['Продано'] = response[0]['qnt']
            except requests.ConnectTimeout:
                card['Продано'] = 'нет данных'
            print(f"Собрано карточек: {self.product_cards.index(card) + 1}"
                  f" из {len(self.product_cards)}")

    def save_to_excel(self, file_name: str) -> str:

        data = pd.DataFrame(self.product_cards)
        result_path = (f"{path.join(self.directory, file_name)}_"
                       f"{self.run_date.strftime('%Y-%m-%d')}.xlsx")
        writer = pd.ExcelWriter(result_path)
        data.to_excel(writer, 'data', index=False)
        writer.close()
        return result_path

    def get_all_products_in_search_result(self, key_word: str):

        for page in range(1, 50):
            print(f"Загружаю товары со страницы {page}")
            url = (f"https://search.wb.ru/exactmatch/ru/common/v4/search?"
                   f"appType=1&curr=rub&dest=-1257786&page={page}"
                   f"&query={'%20'.join(key_word.split())}&resultset=catalog"
                   f"&sort=popular&spp=24&suppressSpellcheck=false")
            if self.add_data_from_page(url):
                break

    def run_parser(self):

        instructons = """Введите 1 для парсинга категории целиком,
        2 — по ключевым словам: """
        mode = input(instructons)
        if mode == '1':
            local_catalogue_path = self.download_current_catalogue()
            print(f"Каталог сохранен: {local_catalogue_path}")
            processed_catalogue = self.process_catalogue(local_catalogue_path)
            input_category = input("Введите название категории или ссылку: ")
            category_data = self.extract_category_data(processed_catalogue,
                                                       input_category)
            if category_data is None:
                print("Категория не найдена")
            else:
                print(f"Найдена категория: {category_data[0]}")
            self.get_all_products_in_category(category_data)
            self.get_sales_data()
            print(f"Данные сохранены в {self.save_to_excel(category_data[0])}")
        if mode == '2':
            key_word = input("Введите запрос для поиска: ")
            self.get_all_products_in_search_result(key_word)
            self.get_sales_data()
            print(f"Данные сохранены в {self.save_to_excel(key_word)}")

