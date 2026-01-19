from sqlmodel import Session, create_engine
from contextlib import contextmanager
from typing import Generator
from config import settings


# Create the database engine
engine = create_engine(settings.DATABASE_URL)


@contextmanager
def get_db_session() -> Generator[Session, None, None]:
    """
    Get a database session with proper cleanup.

    Yields:
        Session: A SQLModel database session
    """
    session = Session(engine)
    try:
        yield session
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def get_session_override():
    """
    Override function for dependency injection during testing.
    """
    yield get_db_session()


# Function to get session for FastAPI dependency injection
def get_session() -> Generator[Session, None, None]:
    """
    Get a database session for FastAPI dependency injection.

    Yields:
        Session: A SQLModel database session
    """
    with get_db_session() as session:
        yield session