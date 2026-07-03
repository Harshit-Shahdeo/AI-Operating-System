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

       function repairJson(text) {
    text = text.trim();

    while (text.endsWith("]]")) {
        text = text.slice(0, -1);
    }

    while (text.endsWith("}}")) {
        try {
            JSON.parse(text);
            break;
        } catch {
            text = text.slice(0, -1);
        }
    }

    return text;
}

     console.log("Planner response written to planner-response.txt");
     console.log("Length:", response.text.length);
     console.log("First 50 chars:", JSON.stringify(response.text.slice(0, 50)));
     console.log("Last 50 chars:", JSON.stringify(response.text.slice(-50)));

     const repaired = repairJson(response.text);
        let plan;
        try{
         plan =  JSON.parse(repaired);
        }catch(error){
            console.error("\nInvalid Json recieved from model\n")
            console.error(response.text)
            throw error;
        }
        return Array.isArray(plan) ? plan : [plan];
    }
}

export default GoalPlanner;