import useUserInfo from '@/hooks/useUserInfo';
import Upload from './Upload';
import React, { useState } from 'react'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import RingLoader from "react-spinners/RingLoader";
import Link from 'next/link';


const PostForm = ({ onPost, compact, parent }) => {
    const { userInfo, status } = useUserInfo();
    const [text, setText] = useState('');
    const { data: session, status: sessionStatus } = useSession();
    const [images, setImages] = useState([]);
    // const [isUploading,setIsUploading] = useState(false);

    console.log(session);

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        await axios.post("/api/posts", { text, parent, id: session?.user.id, images });
        setText("");
        setImages([]);
        if (onPost) {
            onPost();
        }
    }

    if (status === "loading") {
        return ''
    }

    return (
        <>
            <form className='mx-5' onSubmit={handleSubmitPost}>
                <div className={(compact ? "items-center" : '') + " flex"}>
                    <div className="">

                        <Link href={`/@${userInfo?.userDoc?.username}`} >
                            <div className="rounded-full overflow-hidden w-14 h-14  bg-green-400 ">
                            <img src={userInfo?.userDoc?.image}  />
                            </div>
                        </Link>
                    </div>
                    <div className="grow pl-2">
                        <Upload onUploadFinish={src => setImages([...images, src])}>
                            {({ isUploading }) => (
                                <div>

                                    <textarea onChange={(e) => setText(e.target.value)}
                                        value={text}
                                        className={(compact ? ' h-10 mt-1 ' : '') + "w-full p-2 bg-transparent resize-none  border-twitterBorder"}
                                        placeholder={(compact ? "Tweet your reply" : "What's happening ?")} />

                                    <div className="flex -mb-2 flex-warp items-center">
                                        {images.length > 0 && images.map((image, ind) => (
                                            <div className=" h-24  m-2 " key={ind}>
                                                <img src={image} alt="fake pic" className=" h-24" />
                                            </div>
                                        ))}
                                    </div>
                                    { isUploading && (
                                        <div className="flex items-center justify-center">
                                                           <RingLoader size={48} color={"#fff"}/>
                                        </div>
                                    )

                                    }    
                                </div>
                            )}

                        </Upload>


                        {!compact && (
                            <div className="text-right border-twitterBorder border-t pt-2 pb-2">
                                <button className="bg-twitterBlue text-twitterWhite rounded-full px-5 py-1  ">Tweet</button>
                            </div>
                        )}
                    </div>
                    {compact && (
                        <div className="pl-2">
                            <button className="bg-twitterBlue text-twitterWhite rounded-full px-5 py-1  ">Tweet</button>
                        </div>
                    )

                    }
                </div>
            </form>
        </>
    )
}
export default PostForm;
