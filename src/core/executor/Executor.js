class Executor{
    constructror(Dispatcher){
        this.Dispatcher = Dispatcher;
    }
    async execute(plans){
        let results = [];
        for(const step of plans){
            const {tool, action, params} = step;
            let result = await this.Dispatcher.dispatch(tool, action, params);
        }  if(!result.success){
            results.push(result);

            return{
                success:false,
                completedSteps:results.length,
                results
            }
        }
        results.push(result);
        return{
            success:true,
            completedSteps:results.length,
            results
        }
    } 
    
}  