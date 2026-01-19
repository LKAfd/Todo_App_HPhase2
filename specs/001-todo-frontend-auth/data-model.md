# Data Model: Phase II Frontend for Todo Web Application

## User Entity

**Definition**: Represents an authenticated individual using the todo application, associated with JWT token for session management

**Attributes**:
- id: string (unique identifier from Better Auth)
- email: string (user's email address)
- name: string (user's display name)
- createdAt: Date (account creation timestamp)
- updatedAt: Date (last account update timestamp)

**Validation Rules**:
- Email must be valid email format
- Name must be 1-50 characters
- Email must be unique

## Task Entity

**Definition**: Represents a personal task with properties like title, description, completion status, and creation/modification timestamps

**Attributes**:
- id: string (unique identifier from backend)
- title: string (task title, required)
- description: string (optional task description)
- completed: boolean (completion status)
- userId: string (foreign key to User)
- createdAt: Date (task creation timestamp)
- updatedAt: Date (last task update timestamp)

**Validation Rules**:
- Title must be 1-100 characters
- Description must be 0-500 characters if provided
- Completed must be boolean
- UserId must reference existing user

## State Transitions

**Task State Transitions**:
- Incomplete → Complete (when user toggles completion)
- Complete → Incomplete (when user toggles completion)

**User Session States**:
- Unauthenticated → Authenticating (during login/signup)
- Authenticating → Authenticated (after successful auth)
- Authenticated → Unauthenticated (after logout/expiry)

## Relationships

**User → Task (One-to-Many)**:
- One user can have multiple tasks
- Tasks are owned by a single user
- When user is deleted, their tasks are also deleted