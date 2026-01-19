from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from typing import Generator
from jose import JWTError
from database.database import get_session
from utils.jwt_utils import verify_token, extract_user_id_from_token
from models.user import User
from schemas.user import TokenVerifyResponse
from sqlmodel import select


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> TokenVerifyResponse:
    """
    Get the current authenticated user from the JWT token in the request.

    Args:
        credentials (HTTPAuthorizationCredentials): Bearer token from Authorization header
        session (Session): Database session for user lookup

    Raises:
        HTTPException: If token is invalid or user not found

    Returns:
        TokenVerifyResponse: User information if authenticated
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = credentials.credentials

    try:
        user_info = verify_token(token)
        if user_info is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    # Check if the user exists in the database based on external_id (from JWT)
    statement = select(User).where(User.external_id == user_info.external_id)
    user = session.exec(statement).first()

    # If user doesn't exist, create a new user record
    if user is None:
        # Create a new user based on the JWT information
        user = User(
            external_id=user_info.external_id,
            email=user_info.email,
            name=user_info.name
        )
        session.add(user)
        session.commit()
        session.refresh(user)

        # Update the user_id in the user_info to match the created user
        user_info.user_id = user.id

    # Ensure the user_info has the correct user_id from the database
    user_info.user_id = user.id

    return user_info


def get_current_active_user(current_user: TokenVerifyResponse = Depends(get_current_user)):
    """
    Get the current active user, ensuring they are active.

    Args:
        current_user (TokenVerifyResponse): Current authenticated user

    Returns:
        TokenVerifyResponse: Active user information
    """
    # In a real application, you might check if the user is active
    # For now, we'll just return the current user
    return current_user


def get_user_id_from_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
) -> int:
    """
    Extract the user ID directly from the JWT token.

    Args:
        credentials (HTTPAuthorizationCredentials): Bearer token from Authorization header

    Raises:
        HTTPException: If token is invalid or user ID not found

    Returns:
        int: User ID extracted from token
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token = credentials.credentials

    try:
        user_id = extract_user_id_from_token(token)
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    return user_id