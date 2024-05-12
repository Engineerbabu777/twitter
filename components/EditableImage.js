import React, { useState,useEffect } from 'react'
import { FileDrop } from 'react-file-drop'
import axios from 'axios';
import { useSession } from 'next-auth/react';
// import {PulseLoader} from 'react-spinners';
import RingLoader from "react-spinners/RingLoader";


export default function EditableImage({type,className,cover,picture,editable=false}){

    const {data:session,status:sessionStatus} = useSession();
    const [isFileNearBy,setIsFileNearBy] = useState(false);
    const [isFileOver,setIsFileOver] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [coverPic,setCoverPic] = useState('');
 
 
    
    let extraClasses = '';
    if(isFileNearBy && !isFileOver){
           extraClasses = ' h-36 bg-green-400 opacity-30';
    }
    if(isFileOver){
           extraClasses = ' h-36 bg-green-300 opacity-70' 
    }
    if(!editable){
        extraClasses = ' ';
    }
   
    async function uploadImage(files,e){

        e.preventDefault();
        if(!editable){
            return;
        }
        setIsUploading(true)
        setIsFileNearBy(false);
        setIsFileOver(false);
        console.log(files[0]);
    
        const url = 'http://api.cloudinary.com/v1_1/djo2k58eq/image/upload';
    
        const formData = new FormData();
        formData.append('file',files[0]);
        formData.append('upload_preset', 'new-data');
       
        const data = await fetch(url,{
            method:'POST',
            body:formData
        }).then((r)=> r.json().then())
        setCoverPic(data.secure_url);
        setIsUploading(false)
        // console.log('data:', data.secure_url);
        
    }

    useEffect(()=> {
    
           if(coverPic){
                  axios.post('/api/upload',{upload:`${coverPic}`,user:session?.user.id,type:type});
                  console.log("coverPic -> ",coverPic, "User -> ", session?.user.id)
           }
    
       },[coverPic,sessionStatus,session?.user.id]);
        
    
        return (
            <>
            <FileDrop
            onDrop={uploadImage}
            onDragOver={()=> setIsFileOver(true)}
            onDragLeave={()=> setIsFileOver(false)}
            onFrameDragEnter={()=> setIsFileNearBy(true)}
            onFrameDragLeave={()=> setIsFileNearBy(false)}
            onFrameDrop={()=> {
                setIsFileNearBy(false);
                setIsFileOver(false);
            }}
            >
            <div className={"  object-cover flex items-center justify-center h-36 cursor-pointer overflow-hidden "+extraClasses }>
            
            { isUploading && editable && (

                   <RingLoader size={48} color={"#fff"}/>
            
                   )
               
            }
            { !isUploading  && (
                (coverPic || cover ) && (
                    <img src={coverPic? coverPic:cover} className={" object-cover "+className} />
                )
                
                )}

            </div>
            </FileDrop>
            </>
    )
}