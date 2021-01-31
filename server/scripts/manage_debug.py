#!/usr/bin/env python
"""Django's command-line utility for administrative tasks. (With development settings)."""
import os
import manage


if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project_settings.settings.development')
    manage.main()
