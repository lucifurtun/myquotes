#!/usr/bin/env bash


projdir=$(pwd)
pidfile="$projdir/gunicorn.pid"


function stop() {
    if [ -r "${pidfile}" ]; then
        pid=$(cat ${pidfile}) || return 1
        kill ${pid} || return 1
    fi

    return 0
}

function start() {
    gunicorn project.wsgi:application --config gunicorn.py
    sleep 1
}

function status() {
    if [ -r "${pidfile}" ]; then
        kill -0 $(cat ${pidfile}) >/dev/null 2>&1 && return 0
    fi

    return 1
}

if [ "$1" == "start" ]; then
    if status; then
        echo "safehug already started"
        exit 1
    fi

    start && echo "safehug started" || echo "safehug failed to start"

elif [ "$1" == "stop" ]; then
    if ! status; then
        echo "safehug not running"
        exit 1
    fi

    stop && echo "safehug stopped" || echo "safehug failed to stop"

elif  [ "$1" == "restart" ]; then
    if status; then
        stop && echo "safehug stopped"
    fi

    start && echo "safehug started"

elif [ "$1" == "status" ]; then
    if status; then
        echo "safehug running"
        exit 0

    else
        echo "safehug stopped"
        exit 1
    fi
fi
