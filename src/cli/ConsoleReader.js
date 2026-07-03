import readline from "readline";

class ConsoleReader {

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    read(prompt = "AI-OS > ") {

        return new Promise(resolve => {
            this.rl.question(prompt, answer => {
                resolve(answer);
            });
        });

    }

    close() {
        this.rl.close();
    }

}

export default ConsoleReader;