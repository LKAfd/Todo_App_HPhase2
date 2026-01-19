# Quickstart Guide: Todo Backend API

## Prerequisites
- Python 3.10+
- Pip package manager
- Access to Neon PostgreSQL database
- Better Auth frontend for JWT tokens

## Setup Instructions

1. **Clone and Setup Virtual Environment**
   ```bash
   git clone <repository-url>
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Update environment variables:
   DATABASE_URL=<neon-postgres-db-url>
   JWT_ALGORITHM=RS256
   JWT_PUBLIC_KEY=<better-auth-public-key>
   ```

4. **Run Development Server**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   # API will be available at http://localhost:8000
   # Documentation at http://localhost:8000/docs
   ```

## API Usage Examples

1. **Getting User Tasks**
   ```bash
   curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        http://localhost:8000/api/tasks
   ```

2. **Creating a New Task**
   ```bash
   curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"title":"My new task","description":"Task details"}' \
        http://localhost:8000/api/tasks
   ```

3. **Updating a Task**
   ```bash
   curl -X PUT -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"title":"Updated task title"}' \
        http://localhost:8000/api/tasks/1
   ```

4. **Deleting a Task**
   ```bash
   curl -X DELETE -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        http://localhost:8000/api/tasks/1
   ```

## Development Commands

```bash
# Run development server
uvicorn main:app --reload

# Run tests
pytest
pytest tests/integration/

# Run tests with coverage
pytest --cov=backend

# Format code
black .

# Lint code
flake8
```

## Troubleshooting

- **Database Connection Issues**: Verify DATABASE_URL is properly configured
- **JWT Validation Failures**: Check that JWT public key matches Better Auth configuration
- **CORS Issues**: Verify frontend domain is added to CORS allowed origins
- **Migration Issues**: Run database migrations before starting the server