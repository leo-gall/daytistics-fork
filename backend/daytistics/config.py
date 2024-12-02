import os

# Security
SECRET_KEY = os.getenv("SECRET_KEY")
JWT_AUTH_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 30
