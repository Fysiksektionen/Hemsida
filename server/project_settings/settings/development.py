from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

if USE_DB_TEST_IN_DEBUG:
    DATABASES['default'] = {
        {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': DB_TEST_NAME,
            'USER': DB_TEST_USER,
            'PASSWORD': DB_TEST_PASSWORD,
            'HOST': DB_TEST_HOST,
            'PORT': DB_TEST_PORT
        }
    }
