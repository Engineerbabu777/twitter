import React from 'react'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import PostContent from '@/components/PostContent';
import Layout from '@/components/Layout';
import Link from 'next/link';
import useUserInfo from '@/hooks/useUserInfo';
import PostForm from '@/components/PostForm';
import {useSession} from 'next-auth/react';
const PostPage = () => {

    const router = useRouter();
    const { id } = router.query;
    const {data:session,status:sessionStatus} = useSession();
    const [post, setPost] = useState([null]);
    const { userInfo } = useUserInfo();
    const [replies,setReplies] = useState([]);
    const [replieslikedByMe,setrepliesLikedByMe] = useState([]);

    const fetchData =async()=> {

        axios.get(`/api/posts?id=${id}`)
            .then((res) => {
                setPost(res.data)
            });

        axios.get(`/api/posts?parent=${id}`)
        .then((response) => {
         setReplies(response.data.posts);
         setrepliesLikedByMe(response.data.likeByMe)
        })
    }
    useEffect(() => {
        if (!id) {
            return;
        }
        
        fetchData();
    }, [id,sessionStatus]);

    return (
        <Layout>
            {
                !!post?._id && (
                    <div className="px-5 py-2">
                        <Link href="/" className="font-bold flex gap-x-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg><div>Tweet</div>
                        </Link>
                        { post?.parent && (
                            <div className="pb-2">
                                <PostContent {...post.parent} />
                                <div className=" ml-5 h-12 relative mt-1">
                                    <div className="border-l-2 border-twitterBorder absolute h-20 -top-7" style={{marginLeft:"2px"}}></div>
                                </div>
                            </div>
                        )}
                        <PostContent  {...post} big />

                    </div>
                )
            }
            {!!userInfo && (
              <>
              <div className="border-t border-twitterBorder py-5">
                    <PostForm onPost={fetchData} compact parent={id} />
              </div>

                { replies.length > 0 && replies.map((reply,id)=> (

                    <div key={id} className="p-5 border-t border-twitterBorder">
                  <PostContent {...reply} likeByMe={replieslikedByMe.includes(reply._id)}/>
                 </div>

                ))

                }
              </>
            )}


        </Layout>
    )
}

export default PostPage
