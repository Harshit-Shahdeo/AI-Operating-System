import fs from "fs/promises";

class ollamaClient{

    constructor(baseUrl, model){
       this.baseUrl = baseUrl;
       this.model = model;
    }
     
    async generate(prompt){
        const requestBody={
            model:this.model,
            prompt,
            stream:false,
    
        };
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(requestBody)

        });
        const data = await response.json();


        return{
        success:true,
        text:data.response,
        metadata:{
         model:data.model,
         craetedat:data.created_at,
         done:data.done
        }
    };
    }
    
 
   

}

export default ollamaClient;