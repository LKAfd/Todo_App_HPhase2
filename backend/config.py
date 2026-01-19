import os
from typing import Optional
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")

    # JWT settings
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "fallback_secret_key")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

    # App settings
    APP_NAME: str = os.getenv("APP_NAME", "Todo Backend API")
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    VERSION: str = os.getenv("VERSION", "1.0.0")


settings = Settings()