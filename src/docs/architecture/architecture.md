# AI-OS Architecture

## Vision

AI-OS is a modular AI operating runtime designed to understand natural language, plan multi-step tasks, execute them safely through a controlled tool system, maintain long-term memory, and continuously expand its capabilities.

The long-term goal is not to build another chatbot, but to build a personal AI operating system capable of understanding and interacting with the user's digital environment.

---

# Development Philosophy

AI-OS follows an evolutionary architecture.

The objective is to build a scalable architecture while avoiding unnecessary abstractions.

Core principles:

- Every abstraction must reduce complexity.
- Stable contracts, evolving implementations.
- Low coupling, high cohesion.
- Single Responsibility Principle.
- Open/Closed Principle.
- AI generates plans, never executes commands directly.
- Tools own their own implementation.
- Components communicate through explicit contracts.

---

# High-Level Architecture

User

↓

Planner

↓

Executor

↓

Dispatcher

↓

Tool Registry

↓

Tools

↓

Operating System

---

# Core Components

## Planner

Responsible for converting user intent into executable plans.

The planner never performs execution.

Output:

- Execution Plan

---

## Executor

Responsible for executing plans sequentially.

Responsibilities:

- Execute plan steps
- Collect execution results
- Handle failures
- Produce execution reports

The executor never knows tool implementations.

---

## Dispatcher

Routes execution requests to the correct tool.

Responsibilities:

- Find requested tool
- Find requested action
- Invoke action
- Return standardized response

The dispatcher contains no business logic.

---

## Tool Registry

Stores all available runtime capabilities.

Responsibilities:

- Register tools
- Retrieve tools
- Runtime capability discovery

The registry never executes tools.

---

## Tools

Tools implement concrete capabilities.

Examples:

- Filesystem
- Terminal
- Browser
- Git
- Docker
- Email

Every tool exposes actions through a standardized contract.

---

# Current Runtime Flow

User Request

↓

Planner

↓

Execution Plan

↓

Executor

↓

Dispatcher

↓

Registry

↓

Tool

↓

Operating System

↓

Tool Response

↓

Executor

↓

Execution Report

---

# Current Project Scope (V1)

Implemented:

- Tool Registry
- Dispatcher
- Executor
- Filesystem Tool

In Progress:

- Planner
- Plan Contract
- Runtime Composition

Future:

- Memory
- Knowledge Base
- Activity Tracking
- Plugin System
- Remote Interface
- Recovery Planning

---

# Current Project Structure

src/

core/

tools/

memory/

knowledge/

connectors/

utils/

index.js

---

This document describes the current architecture of AI-OS.

The reasoning behind architectural decisions is documented separately under `docs/adr/`.
# Current File Strcuture 

AI-OS/
│
├── docs/
│   │
│   ├── architecture/
│   │   ├── architecture.md
│   │   └── diagrams/
│   │       ├── runtime-v1.drawio
│   │       └── runtime-v1.png
│   │
│   └── adr/
│       └── (empty for now)
│
├── src/
│   │
│   ├── core/
│   │   │
│   │   ├── planner/
│   │   │   └── Planner.js
│   │   │
│   │   ├── executor/
│   │   │   └── Executor.js
│   │   │
│   │   ├── dispatcher/
│   │   │   └── Dispatcher.js
│   │   │
│   │   ├── registry/
│   │   │   └── ToolRegistry.js
│   │   │
│   │   └── contracts/
│   │       ├── Plan.js
│   │       ├── Action.js
│   │       └── ToolResponse.js
│   │
│   ├── tools/
│   │   │
│   │   └── filesystem/
│   │       └── FilesystemTool.js
│   │
│   ├── memory/
│   │
│   ├── knowledge/
│   │
│   ├── connectors/
│   │
│   ├── utils/
│   │
│   └── index.js
│
├── .gitignore
├── package.json
└── README.md

# Structre Update-01

AI-OS/
│
├── docs/
│   ├── architecture/
│   │   ├── architecture.md
│   │   └── diagrams/
│   │       ├── runtime-v1.drawio
│   │       └── runtime-v1.png
│   │
│   └── adr/
│       └── 0001-ai-is-a-core-subsystem.md
│
├── src/
│   │
│   ├── core/
│   │   │
│   │   ├── ai/
│   │   │   ├── clients/
│   │   │   │   └── OllamaClient.js
│   │   │   │
│   │   │   ├── PromptBuilder.js
│   │   │   ├── ResponseParser.js
│   │   │   └── PlanValidator.js
│   │   │
│   │   ├── planner/
│   │   │   └── Planner.js
│   │   │
│   │   ├── executor/
│   │   │   └── Executor.js
│   │   │
│   │   ├── dispatcher/
│   │   │   └── Dispatcher.js
│   │   │
│   │   ├── registry/
│   │   │   └── ToolRegistry.js
│   │   │
│   │   └── contracts/
│   │       ├── Plan.js
│   │       ├── Action.js
│   │       └── ToolResponse.js
│   │
│   ├── tools/
│   │   └── filesystem/
│   │       └── FilesystemTool.js
│   │
│   ├── memory/
│   │
│   ├── knowledge/
│   │
│   ├── connectors/
│   │
│   ├── utils/
│   │
│   └── index.js
│
├── package.json
├── .gitignore
└── README.md