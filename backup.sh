#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

docker-compose exec db pg_dump --no-owner --no-acl -U myquotes myquotes > db.dump
source ~/Envs/backups/bin/activate
python drive.py