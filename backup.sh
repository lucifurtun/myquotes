#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

docker-compose exec -T db pg_dump --no-owner --no-acl -U myquotes myquotes > db.dump
python3 drive.py
mv db.dump db_old.dump