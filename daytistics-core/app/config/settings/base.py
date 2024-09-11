from pathlib import Path
import os
from dotenv import load_dotenv
from app.config.settings.constants import *

load_dotenv()

# DJANGO SETTINGS

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

ALLOWED_HOSTS = os.getenv('DJANGO_ALLOWED_HOSTS').split(', ')
print(ALLOWED_HOSTS)

ROOT_URLCONF = 'app.config.urls'

WSGI_APPLICATION = 'app.config.wsgi.application'

SITE_URL = 'http://localhost:3000'

INSTALLED_APPS = [
	# Custom Apps
	'app.daytistics',
	'app.activities',
	'app.accounts',
	'app.tools',
	'app.users',
	# Django Apps
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.sites',
	'django.contrib.staticfiles',
	# Third Party Apps
	'tailwind',
	'app.theme',
	'django_browser_reload',
	'django_htmx',
	'widget_tweaks',
	'mathfilters',
	'django_unicorn',
	'corsheaders',
	# API
	'rest_framework',
	'rest_framework.authtoken',
	# Authentication
	'allauth',
	'allauth.account',
	'allauth.socialaccount',
	'dj_rest_auth',
	'dj_rest_auth.registration',
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'whitenoise.middleware.WhiteNoiseMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'allauth.account.middleware.AccountMiddleware',
	'django_htmx.middleware.HtmxMiddleware',
	'django_browser_reload.middleware.BrowserReloadMiddleware',
	'corsheaders.middleware.CorsMiddleware',
]

# REST FRAMEWORK SETTINGS

REST_USE_JWT = True

JWT_AUTH_COOKIE = 'daytistics-auth'

REST_FRAMEWORK = {
	'DEFAULT_AUTHENTICATION_CLASSES': [
		'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
	],
}

# AUTHENTICATION SETTINGS

SITE_ID = 1

ACCOUNT_AUTHENTICATION_METHOD = 'username_email'
ACCOUNT_USER_MODEL_USERNAME_FIELD = 'username'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 1
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_SIGNUP_PASSWORD_ENTER_TWICE = False
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION = True

LOGIN_URL = '/daytistics/login/'
LOGIN_REDIRECT_URL = '/daytistics/dashboard/'
LOGOUT_REDIRECT_URL = '/daytistics/dashboard/'

AUTH_USER_MODEL = 'accounts.CustomUser'

AUTHENTICATION_BACKENDS = [
	'allauth.account.auth_backends.AuthenticationBackend',
	'django.contrib.auth.backends.ModelBackend',
]

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

# TEMPLATE SETTINGS

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [BASE_DIR / 'templates'],
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
			'loaders': [
				'django.template.loaders.filesystem.Loader',
				'django.template.loaders.app_directories.Loader',
			],
			'builtins': [],
			'libraries': {},
		},
	},
]

# STATIC FILES SETTINGS

STATIC_URL = 'static/'

STATICFILES_DIRS = [
	BASE_DIR / 'static',
]

# TAILWIND SETTINGS

TAILWIND_APP_NAME = 'app.theme'

INTERNAL_IPS = [
	'127.0.0.1',
]

# INTERNATIONALIZATION SETTINGS

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

# MISCELLANEOUS SETTINGS

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

NPM_BIN_PATH = '/usr/bin/npm'
