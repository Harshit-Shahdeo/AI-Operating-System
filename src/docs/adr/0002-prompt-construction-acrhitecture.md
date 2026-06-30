# ADR-0002: Planner Owns Prompt Construction

## Status

Accepted

---

## Context

AI-OS uses Large Language Models (LLMs) to convert natural language requests into executable plans.

Initially, prompt construction was considered part of the AI subsystem because prompts are ultimately sent to an LLM.

During architectural review, it became clear that prompt construction is not an AI infrastructure concern but a planning concern.

Prompt builders understand:

* Execution Plan Protocol
* Available tools
* Planning rules
* User intent
* Planner-specific behavior

AI clients, on the other hand, only communicate with external model providers.

Mixing these responsibilities reduces cohesion and introduces unnecessary coupling between the planning subsystem and AI infrastructure.

---

## Decision

Prompt construction belongs entirely to the **Planner subsystem**.

The AI subsystem is responsible only for communication with LLM providers.

Planner components construct prompts and invoke an AI client to generate responses.

---

## Resulting Architecture

```text
core/
├── ai/
│   └── clients/
│       └── OllamaClient.js
│
├── planner/
│   ├── GoalPlanner.js
│   ├── prompts/
│   │   ├── GoalPromptBuilder.js
│   │   └── templates/
│   │       └── goalPlanner.template.js
│   └── protocol/
│
├── executor/
├── dispatcher/
└── registry/
```

---

## Responsibilities

### AI Subsystem

Responsible for:

* Model communication
* Provider-specific implementations
* HTTP requests
* Authentication
* Response translation
* Provider abstraction

Not responsible for:

* Planning
* Prompt generation
* Execution Plan construction

---

### Planner Subsystem

Responsible for:

* Planning workflow
* Prompt construction
* Prompt templates
* Execution Plan generation
* Planning protocol

---

## Rationale

This decision follows the principle of **high cohesion**.

Prompt construction changes when planning behavior changes.

AI clients change when model providers or communication mechanisms change.

These are independent reasons to change and therefore belong to different subsystems.

The planner depends on the AI subsystem, but the AI subsystem remains unaware of planning concepts.

This keeps subsystem boundaries clear and supports future expansion with additional planners and AI providers.

---

## Consequences

### Advantages

* Higher cohesion within the Planner subsystem.
* Lower coupling between planning and AI infrastructure.
* AI clients remain reusable across different planners.
* Prompt templates evolve independently of model communication.
* Clear ownership of planning responsibilities.

### Trade-offs

* Slightly larger Planner subsystem.
* Prompt-related files are distributed by feature rather than grouped with AI infrastructure.

---

## Architectural Principle

**Subsystems own their domain-specific logic. Shared infrastructure remains independent.**

AI provides reasoning capability.

Planners decide **how** that reasoning capability is used.
