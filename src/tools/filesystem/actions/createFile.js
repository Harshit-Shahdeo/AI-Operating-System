import fs from "fs/promises";

export default async function  createFile({path, content, recursive,}, context){

    const absolutePath = context.workspace.resolve(path);
            await fs.writeFile(absolutePath, content, {
                encoding:"utf-8",
                flag:"w"
            });

            return{
                success:true,
                action:"createFile",
                data:{
                    path
                }
            }
        }