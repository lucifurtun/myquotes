FROM python:3.6

MAINTAINER Luci Furtun <lucianfurtun@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir /app

ADD . /app/
WORKDIR /app

RUN pip install -r requirements.txt
RUN pip install gunicorn==19.7.1

CMD python manage.py runserver 0.0.0.0:8888
