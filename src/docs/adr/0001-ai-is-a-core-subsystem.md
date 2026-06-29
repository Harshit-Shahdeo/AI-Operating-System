# ADR-0001: AI is a Core Runtime Subsystem

## Context

AI-OS is fundamentally an AI operating system, not a traditional application that consumes AI as an external service.

During the initial architecture design, we considered two possible structures:

Option 1:

src/
├── core/
└── infrastructure/
    └── llm/

Option 2:

src/
└── core/
    └── ai/

The question was whether AI model interaction should be treated as infrastructure or as part of the core runtime.

---

## Decision

The AI subsystem will reside under:

src/core/ai/

rather than as an external infrastructure module.

The AI subsystem represents the reasoning engine of AI-OS and is considered a first-class runtime component.

---

## Rationale

The identity of AI-OS is defined by its ability to reason, plan, and make intelligent decisions.

Removing the AI subsystem would fundamentally change the nature of the system.

Unlike databases, external APIs, or storage providers, AI is not merely a supporting technology—it is central to the runtime itself.

The `core/ai` subsystem is responsible for AI-related functionality such as:

- Model clients (Ollama, OpenAI, etc.)
- Prompt construction
- Response parsing
- AI-specific utilities

The Planner depends on this subsystem to generate execution plans but does not own the implementation of AI communication.

---

## Consequences

Benefits:

- AI becomes an explicit architectural subsystem.
- Planner remains responsible for planning rather than model communication.
- Multiple model providers can coexist behind the AI subsystem.
- Future AI capabilities can be added without coupling them to the Planner.

Trade-offs:

- The project intentionally treats AI as part of the runtime rather than generic infrastructure.
- If AI-OS were ever rewritten as a non-AI application, this architectural decision would need to be revisited.

---

## Alternatives Considered

### AI as Infrastructure

```
src/
├── core/
└── infrastructure/
    └── llm/
```

Rejected because it models AI as an external dependency rather than the primary reasoning engine of AI-OS.

For this project, AI is a defining capability, not an optional integration.