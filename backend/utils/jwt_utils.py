from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from fastapi import HTTPException, status
from config import settings
from schemas.user import TokenVerifyResponse


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    Create an access token with the provided data and expiration time.

    Args:
        data (dict): Data to encode in the token
        expires_delta (Optional[timedelta]): Token expiration time delta

    Returns:
        str: Encoded JWT token
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.JWT_SECRET_KEY, algorithm=settings.JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> Optional[TokenVerifyResponse]:
    """
    Verify a JWT token and return user information if valid.

    Args:
        token (str): JWT token to verify

    Returns:
        Optional[TokenVerifyResponse]: User information if token is valid, None otherwise
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])

        # Extract user information from the payload
        user_id = payload.get("user_id")
        external_id = payload.get("sub")
        email = payload.get("email", None)
        name = payload.get("name", None)

        if external_id is None:
            return None

        return TokenVerifyResponse(
            user_id=user_id,
            external_id=external_id,
            email=email,
            name=name
        )
    except JWTError:
        return None


def extract_user_id_from_token(token: str) -> Optional[int]:
    """
    Extract the user ID from a JWT token.

    Args:
        token (str): JWT token to extract user ID from

    Returns:
        Optional[int]: User ID if found and valid, None otherwise
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("user_id")
        return user_id
    except JWTError:
        return None


def is_token_expired(token: str) -> bool:
    """
    Check if a JWT token is expired.

    Args:
        token (str): JWT token to check

    Returns:
        bool: True if token is expired, False otherwise
    """
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        exp_timestamp = payload.get("exp")

        if exp_timestamp is None:
            return True

        exp_datetime = datetime.fromtimestamp(exp_timestamp)
        current_datetime = datetime.utcnow()

        return current_datetime > exp_datetime
    except JWTError:
        return True