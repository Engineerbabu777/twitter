
import {useState} from 'react';
import axios from 'axios';
import {useSession} from 'next-auth/react';
import FlipNumbers from 'react-flip-numbers';
import Link from 'next/link';

const PostButtons = ({username,id,commentCount,likedByMe:DefaultLiked = false,likeCount:DefaultLikesCount=0}) => {
   console.log("username",username)
    const [likeCount,setLikesCount] = useState(DefaultLikesCount);
    const [likedByMe,setLikedByMe] = useState(DefaultLiked);
    const {data:session , status:sessionStatus} = useSession();
    // console.log(session);
    const toggleLike = async() => {
        await axios.post("/api/like",{id , currentUser:session?.user.id})
        .then((response) => {
         if(response?.data?.liked){
            setLikesCount(likeCount + 1);
           setLikedByMe(true);
         }else{
            setLikesCount(likeCount - 1);
            setLikedByMe(false);
         }
        });
        
    }
    // console.log(username,id)
    return (
        <div className="flex justify-between mr-12 items-center text-twitterLightGray text-sm mt-2">
            <Link href={`/${username}/status/${id}`}>
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span>{commentCount}</span>
            </div>
            </Link>

            <div className="flex items-center justify-center">
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                </svg>

                <span>0</span>
            </div>
            <button className={ (likedByMe? "text-red-500 fill-red-500" : " " ) + " flex items-center justify-center"} onClick={toggleLike} >
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 pr-1 fill-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span>                <FlipNumbers height={12} width={12} play perspective={100} numbers={likeCount.toString()} />
</span>
            </button>
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 pr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                <span>0</span>
            </div>
        </div>
    )
}

export default PostButtons;