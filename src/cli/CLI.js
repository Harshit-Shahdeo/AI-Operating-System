class CLI {

    constructor(
        planner,
        executor,
        consoleReader
    ) {
        this.planner = planner;
        this.executor = executor;
        this.consoleReader = consoleReader;
    }

    async start() {

        console.log("AI-OS Started\n");

        while (true) {

            const request = await this.consoleReader.read();

            if (request === "exit") {
                this.consoleReader.close();
                break;
            }

            const plan = await this.planner.plan(request);

            console.log("\nExecution Plan\n");
            console.log(JSON.stringify(plan, null, 2));

            const result = await this.executor.execute(plan);

            console.log("\nExecution Result\n");
            console.log(JSON.stringify(result, null, 2));

            console.log();
        }

    }

}

export default CLI;