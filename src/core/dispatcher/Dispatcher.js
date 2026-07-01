class Dispatcher{
    constructor(registry){
        this.registry = registry;
    }

    async dispatch(toolName, action, params){
        try{
            const tool = this.registry.get(toolName);
            if(!tool){
                throw new Error(`Tool ${toolName} not found`);
            }
            const method = tool.actions[action];
            if(typeof method !=="function"){
                throw new Error(`Action ${action} not found on ${toolName}`);
            }
            return await method(params);
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