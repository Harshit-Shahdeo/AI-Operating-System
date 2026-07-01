class Executor{
    constructor(dispatcher){
        this.dispatcher = dispatcher;
    }
    async execute(plans){
        let results = [];
        for(const step of plans){
            const {tool, action, params} = step;
            let result = await this.dispatcher.dispatch(tool, action, params);
          if(!result.success){
            results.push(result);

            return{
                success:false,
                completedSteps:results.length,
                results
            }
        }
    
        results.push(result);
    }
        return{
            success:true,
            completedSteps:results.length,
            results
        }
    } 
    
}  
export default Executor;