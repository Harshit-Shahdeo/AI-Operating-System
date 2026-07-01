import fs from "fs/promises";

export default async function  createFile({path, content, recursive}){
            await fs.writeFile(path, content, {
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