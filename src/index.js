import app from "./bootstrap.js";

const userRequest =
    "Create a folder named HelloJava. Inside it create Main.java containing a Java Hello World program.";

async function main() {

    const executionPlan = await app.planner.plan(userRequest);

    console.log("Execution Plan:");
       console.log(JSON.stringify(executionPlan, null, 2));

    const result = await app.executor.execute(executionPlan);

    console.log("Execution Result:");
   console.log(JSON.stringify(result, null, 2));
}

main();