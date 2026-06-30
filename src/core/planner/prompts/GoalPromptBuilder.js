class GoalPromptBuilder {

    build(context) {
        
        const tools = context.availableTools
    .map(tool => `- ${tool}`)
    .join("\n");

    }

}

export default GoalPromptBuilder;