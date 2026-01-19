from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class UserResponse(BaseModel):
    id: int
    external_id: str
    email: Optional[str] = None
    name: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TokenVerifyResponse(BaseModel):
    user_id: int
    external_id: str
    email: Optional[str] = None
    name: Optional[str] = None

    class Config:
        from_attributes = True