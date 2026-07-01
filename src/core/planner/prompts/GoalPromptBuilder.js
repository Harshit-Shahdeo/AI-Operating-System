class GoalPromptBuilder {

    build(context) {

        const availableTools = context.availableTools
            .map(tool => `
Tool: ${tool.name}

Description:
${tool.description}

Actions:
${tool.actions
    .map(action => `
- ${action.name}
  Description: ${action.description}
  Parameters:
${Object.entries(action.params)
    .map(([name, type]) => `    - ${name}: ${type}`)
    .join("\n")}
`)
    .join("\n")}
`)
            .join("\n");

        return `
You are the Goal Planner for AI-OS.

Your responsibility is to convert a user's natural language request into a valid execution plan.

==============================
AVAILABLE TOOLS
==============================

${availableTools}

==============================
RULES
==============================

1. Return ONLY valid JSON.
2. Return a JSON ARRAY.
3. Do NOT return a single JSON object.
4. Do NOT use markdown.
5. Do NOT explain your reasoning.
6. Do NOT include comments.
7. Do NOT include any text before or after the JSON.
8. Use ONLY the tool names listed above.
9. Use ONLY the action names listed above.
10. Use ONLY the parameter names listed above.
11. Never invent tools.
12. Never invent actions.
13. Never invent parameters.
14. Every execution step must contain:
    - id
    - tool
    - action
    - params
15. If multiple actions are required, create multiple execution steps.
16. If no available tool can satisfy the request, return an empty array [].

==============================
OUTPUT FORMAT
==============================

[
    {
        "id": 1,
        "tool": "filesystem",
        "action": "createDirectory",
        "params": {
            "path": "Projects"
        }
    },
    {
        "id": 2,
        "tool": "filesystem",
        "action": "createFile",
        "params": {
            "path": "Projects/Main.java",
            "content": "public class Main {
    public static void main(String[] args) {
        System.out.println(\\"Hello, World!\\");
    }
}"
        }
    }
]

==============================
IMPORTANT
==============================

The first character of your response MUST be '['.

The last character of your response MUST be ']'.

Return ONLY the JSON array.

==============================
USER REQUEST
==============================

${context.userRequest}
`;
    }

}

export default GoalPromptBuilder;