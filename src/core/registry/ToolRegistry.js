class ToolRegistry{
    constructor(){
        this.tools = new Map();
    }

    register(name, tool){
        this.tools.set(name, tool);
    }

    get(name){
        return this.tools.get(name);
    }

    has(name){
        return this.tools.has(name);
    }

    describe() {
    return [...this.tools.values()].map(tool => tool.describe());
}

    
}
 export default ToolRegistry;