# Research Findings: Phase II Backend API Integration

## Decision: JWT verification method
**Rationale**: Using public key cryptography approach to verify JWT tokens issued by Better Auth frontend, which is more secure than shared secrets as it doesn't require sharing signing keys with the backend.
**Details**:
- Obtain Better Auth's public key to verify JWT signatures
- This approach avoids storing sensitive signing keys on the backend
- More scalable as key rotation is handled by the auth provider

## Decision: Task filtering by user_id in ORM
**Rationale**: Using SQLModel's query filters with the authenticated user's ID extracted from the JWT token to ensure proper data isolation.
**Details**:
- Query filtering: `select(Task).where(Task.user_id == current_user_id)`
- This ensures users can only access their own tasks
- Implemented as part of the authentication dependency

## Decision: Hard delete vs soft delete for tasks
**Rationale**: Implementing soft delete for tasks to maintain data integrity and allow for potential recovery of accidentally deleted tasks.
**Details**:
- Add `deleted_at` timestamp field to Task model
- Modify queries to exclude soft-deleted tasks by default
- Implement periodic cleanup process for permanently removing old soft-deleted tasks

## Decision: API response structure
**Rationale**: Using a standardized JSON response schema that includes metadata alongside the primary data to provide consistent API responses for the frontend.
**Details**:
- Standard response format: `{ "success": true, "data": {...}, "message": "...", "timestamp": "..." }`
- Error responses follow the same structure with appropriate HTTP status codes
- Makes frontend consumption more predictable

## Decision: FastAPI dependency injection pattern
**Rationale**: Using FastAPI's dependency injection system to handle authentication and database sessions consistently across all endpoints.
**Details**:
- Create a `get_current_user` dependency that validates JWT and returns user info
- Create a `get_db_session` dependency for database transactions
- Apply these dependencies at the route or app level as appropriate

## Decision: Database connection pooling
**Rationale**: Implementing connection pooling to efficiently handle multiple concurrent requests while maintaining performance.
**Details**:
- Use SQLModel's built-in support with SQLAlchemy engine
- Configure pool size and connection timeouts appropriately for expected load
- Monitor and tune pool settings based on performance metrics