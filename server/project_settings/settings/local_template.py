"""
This file is a template of the file local.py containing local settings for your Django configurations.

If you do not have a local.py yet, copy this file and fill it with your settings.
"""

from pathlib import Path

# Version number
# This should correspond to the value in base.py. If not, check for updated settings or formats.
LOCAL_SETTINGS_VERSION = 1

# URLs
ROOT_URL = Path("")  # Without leading slash (no root url: Path(""))
DOMAIN_URL = Path("https://localhost/")

# Static files
PUBLIC_ROOT = Path(__file__).resolve().parent.parent.parent / 'public'

# Security
SECRET_KEY_PATH = ""
ALLOWED_HOSTS = ['']

# Database
DB_NAME = ''
DB_USER = ''
DB_PASSWORD = ''
DB_HOST = ''
DB_PORT = ''

USE_DB_TEST_IN_DEBUG = False
DB_TEST_NAME = ''
DB_TEST_USER = ''
DB_TEST_PASSWORD = ''
DB_TEST_HOST = ''
DB_TEST_PORT = ''

# Email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = ""
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = ""
EMAIL_HOST_PASSWORD = ""
DEFAULT_FROM_EMAIL = ""
SERVER_EMAIL = DEFAULT_FROM_EMAIL
