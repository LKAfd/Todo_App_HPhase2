# Data Model: Phase II Backend API Integration

## User Entity

**Definition**: Represents an authenticated individual using the todo application, identified by unique user ID from JWT token

**Attributes**:
- id: int (primary key, auto-generated)
- external_id: str (unique identifier from Better Auth, indexed)
- email: str (user's email address, optional)
- name: str (user's display name, optional)
- created_at: datetime (timestamp of user creation)
- updated_at: datetime (timestamp of last update)

**Validation Rules**:
- external_id must be unique
- email must be valid email format if provided
- name must be 1-50 characters if provided

## Task Entity

**Definition**: Represents a personal task with properties like title, description, completion status, and user association

**Attributes**:
- id: int (primary key, auto-generated)
- title: str (task title, required, max 200 chars)
- description: str (optional task description, max 1000 chars)
- completed: bool (completion status, default False)
- user_id: int (foreign key to User, required)
- created_at: datetime (timestamp of task creation)
- updated_at: datetime (timestamp of last update)
- deleted_at: datetime (timestamp of soft deletion, nullable)

**Validation Rules**:
- title must be 1-200 characters
- description must be 0-1000 characters if provided
- completed must be boolean
- user_id must reference existing user
- user_id cannot be changed after creation

## State Transitions

**Task State Transitions**:
- Pending → Completed (when user marks task as complete)
- Completed → Pending (when user unmarks task as complete)

**User Session States**:
- Unauthenticated → Authenticated (after JWT validation)
- Authenticated → Unauthenticated (after token expiry/invalidation)

## Relationships

**User → Task (One-to-Many)**:
- One user can have multiple tasks
- Tasks are owned by a single user
- When user is deleted, their tasks are also soft deleted (deleted_at set)

## Indexes

**Database Indexes**:
- User.external_id: For fast JWT token validation
- Task.user_id: For efficient user-specific task queries
- Task.deleted_at: For efficient filtering of soft-deleted tasks
- Task.created_at: For sorting and pagination