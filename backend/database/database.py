from sqlmodel import create_engine, Session, SQLModel
from typing import Generator
from config import settings
from models.user import User
from models.task import Task


# Create the database engine
engine = create_engine(
    settings.DATABASE_URL,
)


def create_db_and_tables():
    """
    Create database tables if they don't exist.
    This should be called when the application starts.
    """
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    """
    Get a database session from the connection pool.

    Yields:
        Session: A SQLModel database session
    """
    with Session(engine) as session:
        yield session