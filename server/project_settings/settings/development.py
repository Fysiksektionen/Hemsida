from .base import *

SECRET_KEY = 'f!7DY?jvcHyrHyFJu!fLvjNU=%*x6V8tMtw_R23&9H&s$GRvG&*HZDtT*hw#'

DEBUG = True

CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

INSTALLED_APPS += ('debug_toolbar',)
MIDDLEWARE += ('debug_toolbar.middleware.DebugToolbarMiddleware', )

ALLOWED_HOSTS = (
    '*'
)

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'hemsidan_db',
        'USER': 'fdev',
        'PASSWORD': 'password',
        'HOST': '',
        'PORT': '',
    }
}

# Serving static files
STATIC_ROOT = PROJECT_ROOT / 'public' / 'staticfiles'
MEDIA_ROOT = PROJECT_ROOT / 'public' / 'mediafiles'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
