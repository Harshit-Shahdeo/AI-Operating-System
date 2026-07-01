import fs from "fs/promises";

class GoalPlanner{
    constructor(aiClient, promptBuilder, registry){
        this.aiClient = aiClient;
        this.promptBuilder = promptBuilder;
        this.registry = registry;
    }
    async plan(userRequest){

        const availableTools = this.registry.describe();

        const context={
           userRequest, 
           availableTools
        }

        const prompt = this.promptBuilder.build(context);
        const response = await this.aiClient.generate(prompt);
       await fs.writeFile("planner-response.txt", response.text);

console.log("Planner response written to planner-response.txt");


        const plan =  JSON.parse(response.text);
        return Array.isArray(plan) ? plan : [plan];
    }
}

export default GoalPlanner;