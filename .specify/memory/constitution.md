<!-- SYNC IMPACT REPORT:
Version change: N/A -> 1.0.0
Modified principles: None (new constitution)
Added sections: All sections
Removed sections: None
Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# Phase II Frontend – Todo Full-Stack Web Application Constitution

## Core Principles

### Spec-Driven Development
All development follows Spec-Kit conventions mandatorily. Every feature must have a well-defined specification before implementation begins. This ensures clarity, testability, and maintainability of the codebase.

### Frontend-Backend Separation
Strict separation of frontend and backend concerns is maintained. The frontend consumes backend services through well-defined APIs without direct coupling to backend implementation details. This enables independent development and scaling of components.

### JWT-Based Authentication
Authentication is implemented using Better Auth with JWT tokens. All user authentication flows must properly handle JWT token generation, storage, validation, and refresh mechanisms. Security is paramount in all authentication-related code.

### Security-First API Consumption
All API calls must include proper Authorization headers with JWT tokens. Security considerations are the primary factor in API design and consumption. No API request should be made without proper authentication where required.

### Maintainability and Clarity
Code must be written with maintainability and clarity in mind, especially for Claude Code execution. Clear variable names, well-structured components, and comprehensive documentation are required. This ensures long-term project sustainability.

### Centralized API Client
All API calls must go through a centralized API client. This ensures consistent error handling, authentication, and request/response processing across the application. No direct fetch calls should be made from components.

## Standards and Constraints

The following standards and constraints govern the development of this application:

- Framework: Next.js 16+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Authentication: Better Auth (JWT enabled)
- Output format: Production-ready frontend code
- All API calls via centralized API client
- No hardcoded secrets or user IDs
- UI reflects authenticated user state only

## Development Workflow

Development follows these key practices:

- Follow Next.js App Router best practices
- UI reflects authenticated user state only
- No hardcoded secrets or user IDs
- All code changes must pass through proper review process
- Comprehensive testing for all new features
- Proper error handling and user feedback mechanisms

## Success Criteria

Features and implementations are measured against these success criteria:

- Authenticated users only can access task pages
- JWT attached to every API request
- UI fully matches Phase II feature scope
- All security requirements are met
- Code quality and maintainability standards are satisfied

## Governance

This constitution governs all development activities for the Phase II Frontend Todo application. All team members must adhere to these principles and standards. Any deviation must be documented and approved through proper channels. All PRs and reviews must verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2026-01-18 | **Last Amended**: 2026-01-18