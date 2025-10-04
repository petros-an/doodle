#! /bin/sh

python manage.py migrate
exec gunicorn doodle_server.wsgi -b 0.0.0.0:8000