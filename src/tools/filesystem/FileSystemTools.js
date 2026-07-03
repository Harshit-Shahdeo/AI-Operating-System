import createDirectory from "./actions/createDirectory.js";
import createFile from "./actions/createFile.js";

class FileSystemTool {

    constructor(workspace) {
        this.workspace = workspace;
        this.actions = {
            createDirectory,
            createFile,
        };
    }

    describe() {
    return {
        name: "filesystem",
        actions: [
            {
                name: "createDirectory",
                description: "Creates a directory.",
                params: {
                    path: "string"
                }
            },
            {
                name: "createFile",
                description: "Creates a file.",
                params: {
                    path: "string",
                    content: "string"
                }
            }
        ]
    };
}

}

export default FileSystemTool;