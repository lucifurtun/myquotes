FROM python:3.6

MAINTAINER Luci Furtun <lucianfurtun@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir /app

ADD . /app/
WORKDIR /app
RUN pip install pipenv==2018.11.26
RUN pipenv install
RUN pip install gunicorn==19.7.1

CMD python manage.py runserver 0.0.0.0:8888
