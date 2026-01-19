from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.task import Task, TaskBase
from dependencies.auth import get_current_user
from database.session import get_session
from sqlmodel import Session, select
from models.user import User
from schemas.user import TokenVerifyResponse

router = APIRouter()

@router.get("/tasks", response_model=List[Task])
def get_tasks(current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Retrieve all tasks for the authenticated user.
    """
    # Query tasks for the authenticated user
    statement = select(Task).where(Task.user_id == current_user.user_id)
    tasks = session.exec(statement).all()
    return tasks

@router.post("/tasks", response_model=Task)
def create_task(task_data: TaskBase, current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Create a new task for the authenticated user.
    """
    # Create a new task with the authenticated user's ID
    db_task = Task(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed,
        user_id=current_user.user_id
    )

    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int, current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Retrieve a specific task by ID.
    """
    # Get the task and ensure it belongs to the authenticated user
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskBase, current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Update a specific task by ID.
    """
    # Get the existing task and ensure it belongs to the authenticated user
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Update the task with the new data
    task.title = task_update.title
    task.description = task_update.description
    task.completed = task_update.completed

    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Delete a specific task by ID.
    """
    # Get the task and ensure it belongs to the authenticated user
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    session.delete(task)
    session.commit()
    return {"message": "Task deleted successfully"}

@router.patch("/tasks/{task_id}/toggle", response_model=Task)
def toggle_task_completion(task_id: int, current_user: TokenVerifyResponse = Depends(get_current_user), session: Session = Depends(get_session)):
    """
    Toggle the completion status of a specific task.
    """
    # Get the task and ensure it belongs to the authenticated user
    statement = select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id)
    task = session.exec(statement).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    # Toggle the completion status
    task.completed = not task.completed

    session.add(task)
    session.commit()
    session.refresh(task)
    return task