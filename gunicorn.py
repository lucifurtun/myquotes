bind = 'unix:gunicorn.sock'
workers = 1
reload = True
daemon = True
pidfile = 'gunicorn.pid'
loglevel = 'info'
errorlog = 'gunicorn.error.log'
logfile = 'gunicorn.access.log'
accesslog = 'gunicorn.access.log'

# access_log_format = '%(h)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'
