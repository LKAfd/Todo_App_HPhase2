import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from routes.tasks import router as tasks_router
from middleware.jwt_auth import JWTAuthMiddleware
from dotenv import load_dotenv
from database.database import create_db_and_tables

# Load environment variables
load_dotenv()

app = FastAPI(title="Todo API", version="1.0.0")

# Create database tables on startup
@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Add middleware (excluding health check and root endpoints from auth)
app.add_middleware(
    JWTAuthMiddleware,
    exempt_paths=["/", "/health", "/docs", "/redoc", "/openapi.json"]
)

# Include routes
app.include_router(tasks_router, prefix="/api", tags=["tasks"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )