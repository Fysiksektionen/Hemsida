import json
from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

with open('/etc/django/hemsidan_settings.json') as file:
    settings_file = json.load(file)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = settings_file["SECRET_KEY"]

DEBUG = False

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

ALLOWED_HOSTS = (
    'f.kth.se'
)

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': settings_file["DB"]["NAME"],
        'USER': settings_file["DB"]["USER"],
        'PASSWORD': settings_file["DB"]["PASSWORD"],
        'HOST': settings_file["DB"].get("HOST", ''),
        'PORT': settings_file["DB"].get("PORT", ''),
    }
}