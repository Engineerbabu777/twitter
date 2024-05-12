import React, { useState,useEffect } from 'react'
import { FileDrop } from 'react-file-drop'
import axios from 'axios';
import { useSession } from 'next-auth/react';
// import {PulseLoader} from 'react-spinners';
import RingLoader from "react-spinners/RingLoader";




export default function Upload({children,onUploadFinish}){
    const {data:session,status:sessionStatus} = useSession();
    const [isFileNearBy,setIsFileNearBy] = useState(false);
    const [isFileOver,setIsFileOver] = useState(false);
    const [isUploading,setIsUploading] = useState(false);
    const [picture,setPicture] = useState('');
    let extraClasses = '';
    if(isFileNearBy && !isFileOver){
           extraClasses = ' h-36 bg-green-400 opacity-30';
    }
    if(isFileOver){
           extraClasses = ' h-36 bg-green-300 opacity-70' 
    }
    

    const uploadImage = async(files,e) => {
        e.preventDefault();
        setIsUploading(true)
        setIsFileNearBy(false);
        setIsFileOver(false);
        // console.log(files[0]);
    
        const url = 'http://api.cloudinary.com/v1_1/djo2k58eq/image/upload';
    
        const formData = new FormData();
        formData.append('file',files[0]);
        formData.append('upload_preset', 'new-data');
       
        const data = await fetch(url,{
            method:'POST',
            body:formData
        }).then((r)=> r.json().then())

        setPicture(data.secure_url);
        setIsUploading(false);
        onUploadFinish(data.secure_url);
        console.log("coverPic -> ",data.secure_url, "User -> ", session?.user.id);
    }
    // useEffect(()=> {
    
    //     // if(picture){
    //     //        axios.post('/api/upload',{upload:`${picture}`,user:session?.user.id});
    //     //        console.log("coverPic -> ",picture, "User -> ", session?.user.id)
    //     // }
 
    // },[picture,sessionStatus,session?.user.id]);

 
    return(
    
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
<div className="relative">
    { (isFileNearBy || isFileOver) && (
        <div className="bg-twitterBlue inset-0  mb-1 absolute flex items-center justify-center">
         Drop Your Files Here
        </div>
    )}
    {children(isUploading)}
</div>   
      </FileDrop>
    )
} 

