import os from "os";
import path from "path";

class WorkspaceManager{
    constructor(){
        this.Currentworkspace = os.homedir();
    }

    getWorkspace(){
        return this.Currentworkspace;
    }

    setWorkspace(workspace){
        this.Currentworkspace = workspace
    }

    resolve(relativePath){
        return path.resolve(this.Currentworkspace, relativePath);
    }
}
export default WorkspaceManager;