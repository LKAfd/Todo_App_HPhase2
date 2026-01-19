---
id: 1
title: Update Todo App Frontend Constitution
stage: constitution
date: 2026-01-18
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: default_user
command: /sp.constitution
labels: ["constitution", "todo-app", "frontend", "authentication"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - none
---

## Prompt

/sp.constitution

Project: Phase II Frontend – Todo Full-Stack Web Application

Core principles:
- Spec-driven development (Spec-Kit conventions mandatory)
- Strict separation of frontend and backend concerns
- JWT-based authentication via Better Auth
- Security-first API consumption (Authorization headers required)
- Maintainability and clarity for Claude Code execution

Standards:
- Follow Next.js App Router best practices
- All API calls via centralized API client
- No hardcoded secrets or user IDs
- UI reflects authenticated user state only

Constraints:
- Framework: Next.js 16+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Auth: Better Auth (JWT enabled)
- Output format: Production-ready frontend code

Success criteria:
- Authenticated users only can access task pages
- JWT attached to every API request
- UI fully matches Phase II feature scope

## Response snapshot

Updated the project constitution file (.specify/memory/constitution.md) with the new principles and guidelines for the Phase II Frontend Todo Full-Stack Web Application. The constitution now includes:

- Core Principles: Spec-Driven Development, Frontend-Backend Separation, JWT-Based Authentication, Security-First API Consumption, Maintainability and Clarity, and Centralized API Client
- Standards and Constraints: Defining the tech stack and development guidelines
- Development Workflow: Outlining key practices
- Success Criteria: Defining measurable outcomes
- Governance: Establishing how the constitution governs development

## Outcome

- ✅ Impact: Updated project constitution with comprehensive principles for the Todo app frontend development
- 🧪 Tests: No tests required for this documentation update
- 📁 Files: Modified .specify/memory/constitution.md with new principles and guidelines
- 🔁 Next prompts: Ready to proceed with feature specifications based on the updated constitution
- 🧠 Reflection: The new constitution establishes clear guidelines for JWT authentication, frontend-backend separation, and security-first API consumption

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin feature specification based on the new constitution