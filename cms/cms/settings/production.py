import os

import dj_database_url

from .base import *

DEBUG = False

SECRET_KEY = os.environ["SECRET_KEY"]

# Railway sets RAILWAY_PUBLIC_DOMAIN once the service has a public domain.
# ALLOWED_HOSTS (comma separated) adds any custom domains.
RAILWAY_PUBLIC_DOMAIN = os.getenv("RAILWAY_PUBLIC_DOMAIN")
ALLOWED_HOSTS = [host for host in os.getenv("ALLOWED_HOSTS", "").split(",") if host]
if RAILWAY_PUBLIC_DOMAIN:
    ALLOWED_HOSTS.append(RAILWAY_PUBLIC_DOMAIN)
    WAGTAILADMIN_BASE_URL = f"https://{RAILWAY_PUBLIC_DOMAIN}"
    WAGTAILAPI_BASE_URL = os.getenv("WAGTAILAPI_BASE_URL", WAGTAILADMIN_BASE_URL)
CSRF_TRUSTED_ORIGINS = [f"https://{host}" for host in ALLOWED_HOSTS]

# TLS is terminated at the platform's proxy.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# The container filesystem is wiped on every deploy, so SQLite is not an option.
DATABASES["default"] = dj_database_url.parse(
    os.environ["DATABASE_URL"], conn_max_age=600
)

# Serve the admin's static files from the app itself, with hashed filenames so
# outdated JavaScript / CSS is never served from cache (e.g. after a Wagtail upgrade).
MIDDLEWARE.insert(
    MIDDLEWARE.index("django.middleware.security.SecurityMiddleware") + 1,
    "whitenoise.middleware.WhiteNoiseMiddleware",
)
STORAGES["staticfiles"][
    "BACKEND"
] = "whitenoise.storage.CompressedManifestStaticFilesStorage"

try:
    from .local import *
except ImportError:
    pass
