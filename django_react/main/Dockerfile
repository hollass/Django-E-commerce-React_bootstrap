FROM ubuntu:latest
LABEL authors="hollass"
# Стартовый образ
FROM python:3.11-alpine


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip


COPY ../.. .