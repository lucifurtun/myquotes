FROM matthieugouel/python-gunicorn-nginx:latest
MAINTAINER Luci Furtun <lucianfurtun@gmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app
ADD requirements.txt /usr/src/requirements.txt
RUN cd ../ && pip install -r requirements.txt
ADD . /app/

CMD python manage.py runserver 0.0.0.0:80
