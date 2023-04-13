FROM python:3.10.4-slim

MAINTAINER Luci Furtun <lucianfurtun@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir /app

ADD . /app/
WORKDIR /app
RUN pip install pipenv==2022.11.30
RUN pipenv install --system
RUN pip install gunicorn==20.0.4

CMD python manage.py runserver 0.0.0.0:8888
