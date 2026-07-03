import fs from "fs/promises";

export default async function createDirectory({path, recursive}, context){
    
    const absolutePath = context.workspace.resolve(path);

            await fs.mkdir(absolutePath,{
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