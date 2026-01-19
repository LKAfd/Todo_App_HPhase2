from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=200, description="Task title (1-200 characters)")
    description: Optional[str] = Field(default=None, max_length=1000, description="Optional task description (0-1000 characters)")
    completed: Optional[bool] = Field(default=False, description="Completion status")


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200, description="Task title (1-200 characters)")
    description: Optional[str] = Field(default=None, max_length=1000, description="Optional task description (0-1000 characters)")
    completed: Optional[bool] = Field(default=None, description="Completion status")


class TaskResponse(TaskBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    deleted_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TaskToggleResponse(BaseModel):
    id: int
    completed: bool
    updated_at: datetime

    class Config:
        from_attributes = True