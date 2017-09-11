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
        return 0
    fi

    return 1
}

if [ "$1" == "start" ]; then
    if status; then
        echo "server already started"
        exit 1
    fi

    start && echo "server started" || echo "server failed to start"

elif [ "$1" == "stop" ]; then
    if ! status; then
        echo "server not running"
        exit 1
    fi

    stop && echo "server stopped" || echo "server failed to stop"

elif  [ "$1" == "restart" ]; then
    if status; then
        stop && echo "server stopped"
    fi

    start && echo "server started"

elif [ "$1" == "status" ]; then
    if status; then
        echo "server running"
        exit 0

    else
        echo "server stopped"
        exit 1
    fi
fi
