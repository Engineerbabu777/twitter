import React, { useEffect, useState } from 'react'
import { useSession,signOut } from 'next-auth/react';
import axios from 'axios';
import UsernameForm from '@/components/UsernameForm';
import useUserInfo from '@/hooks/useUserInfo';
import { useRouter } from 'next/router';
import Test from './Test';
import PostForm from '@/components/PostForm';
import PostContent from '@/components/PostContent';
import Layout from '@/components/Layout';

const Home = () => {
  const {data:session , status:sessionStatus} = useSession();
  const { userInfo, setUserInfo ,status: userInfoStatus } = useUserInfo();
  const [posts, setPosts] = useState();
  const [PostsLikedByMe, setPostsLikedByMe] = useState([]);
  const router = useRouter();

  async function fetchAllPosts() {
    if(session?.user){
      await axios.get(`/api/posts?user=${session.user.id}`).then((response) => {
        setPosts(response.data.posts);
       setPostsLikedByMe(response.data.likeByMe);
      })
    }
  }

  useEffect(() => {
    fetchAllPosts()
  }, [session]);
  // console.log(session);
  if (userInfoStatus === "loading") {
    return 'Loading';
  }

  // if (!posts) {
  //   return '';
  // }

  if (!!userInfo && !userInfo?.userDoc?.username ) {
    return <UsernameForm />;
  }
  
  if(!userInfo){
    router.push('/login');
    return 'no user';
  }
  
  const logoutUser = async ()=>{
    await signOut();
    setUserInfo(null);
  }

  return (

    
    <Layout>
      {!!userInfo && (
  <>
          <h1 className="text-lg font-bold p-4">Home</h1>
          <PostForm onPost={() => fetchAllPosts()} />
          {
            posts?.length > 0 && posts.map((post, id) => (
              <div key={id} className="border-t border-twitterBorder p-5">
                { post.parent && (
                  <div className="pb-2">
                    <PostContent {...post.parent} />
                    <div className=" ml-5 h-12 relative mt-1">
                                    <div className="border-l-2 border-twitterBorder absolute h-20 -top-7" style={{marginLeft:"2px"}}></div>
                                </div>
                  </div>
                )

                }
                <PostContent {...post} likeByMe={PostsLikedByMe.includes(post._id)}/>
              </div>
            ))
          }
          <div className="p-5 text-center border-t border-twitterBorder">
            <button onClick={logoutUser} className="bg-twitterWhite text-black px-5 py-2 rounded-full">Logout</button>
          </div>

</>
)}

</Layout>

  )
}

export default Home
