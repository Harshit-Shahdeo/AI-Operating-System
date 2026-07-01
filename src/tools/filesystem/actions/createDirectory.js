import fs from "fs/promises";

export default async function createDirectory({path, recursive}){
            await fs.mkdir(path,{
                recursive
            }
            );

        return{
            success:true,
            action:"createDirectory",
            data:{
                path
            }
        }    
        }