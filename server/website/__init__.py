"""
The app_dir is an example application within the server project.

A django app is a separate part of the project containing everything from url-routs to models for a well
defined part of the project (ex. users). Be careful planning the apps so that they do not have circular dependencies.
"""

default_app_config = 'website.apps.WebsiteAppConfig'