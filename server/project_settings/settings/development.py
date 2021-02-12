from .base import *

DEBUG = True
CSRF_COOKIE_HTTPONLY = True
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

ALLOWED_HOSTS = ['*']
INSTALLED_APPS += [
    'debug_toolbar'
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware'
]

INTERNAL_IPS = [
    '0.0.0.0',
    '127.0.0.1',
    'localhost'
]

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

AUTH_PASSWORD_VALIDATORS = []
