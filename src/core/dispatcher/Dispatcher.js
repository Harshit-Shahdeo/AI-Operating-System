class Dispatcher{
    constructor(registry, workspace){
        this.registry = registry;
        this.workspace = workspace;
    }

      
   

    async dispatch(toolName, action, params){
        const context ={
        workspace:this.workspace
      }
        try{
            const tool = this.registry.get(toolName);
            if(!tool){
                throw new Error(`Tool ${toolName} not found`);
            }
            const method = tool.actions[action];
            if(typeof method !=="function"){
                throw new Error(`Action ${action} not found on ${toolName}`);
            }
            return await method(params, context);
        }catch(error){
            return{
                success:false,
                tool:toolName,
                action,
                error:error.message
            }
        }
    }
}

export default Dispatcher;