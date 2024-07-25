<h1> Интернет-магазин на React + Bootstrap + Django</h1>

<h2> О проекте</h2>

<blockquote>Данный проект представляет собой простой интернет-магазин, разработанный с использованием следующих технологий:</blockquote>

Frontend:
 React
 Bootstrap

Backend:
 Django
 Django REST Framework

<h2>Функциональность</h2>

<table>
<tr><th>🟡 В работе</th><th>🟢 Выполнено</th></tr>
<tr><td>Оформление покупки(frontend)</td><td>Начальный шаблон frontend</td></tr>
  <tr><td>Быстрый просмотр товара</td><td>Оформление покупки(backend)</td></tr>
  <tr><td></td><td>Работа с базой данных</td></tr>
  <tr><td></td><td>Регистрация\аутентификация</td></tr>
  <tr><td></td><td>Баннер</td></tr>
  <tr><td></td><td>Бесконечный скролл</td></tr>
</table>

<h2>Установка и запуск</h2> 

1. Клонируйте репозиторий:

<code>git clone https://github.com/hollass/Django-E-commerce-React_bootstrap</code>


2. Создайте виртуальное окружение и активируйте его:

<code>python3 -m venv venv
source venv/bin/activate</code>


3. Установите зависимости:

<code>pip install -r requirements.txt</code>


4. Выполните миграции базы данных:

<code>python django_react\manage.py migrate</code>


5. Запустите сервер разработки:

<code>python django_react\manage.py runserverr</code>


6. Запустите фронтенд:

<code>cd django_react/frontend/templates
npm install
npm start</code>

