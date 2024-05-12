import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import axios from 'axios';
import Cover from '@/components/Cover';
import PostContent from '@/components/PostContent'
import EditAvatar from '@/components/EditableImage';
import Avatar from '@/components/Avatar';
import useUserInfo from '@/hooks/useUserInfo';
import {useSession} from 'next-auth/react';

const ProfilePage = () => {

    const router = useRouter();
    const {data:session,status} = useSession();
    const { username } = router.query;
    const [profileInfo, setProfileInfo] = useState(null);
    const { userInfo } = useUserInfo(null);
    const [posts, setPosts] = useState();
    const [likedByMe, setLikedByMe] = useState();
    const [editMode , setEditMode] = useState(false);
    const [bio , setBio] = useState();
    const [name,setname] = useState();
    const [nick,setnick] = useState();
    const [isFollowing,setIsFollowing] = useState(false);
    
    let isMyProfile; 
    if(userInfo){
         isMyProfile = userInfo?.userDoc?._id === profileInfo?._id;
    }

  const getUserData = () => {
    if (!username) {
            return;
        }
        const User = username.replace('@', '');
        const user = session?.user?.id;
        console.log("currentUser-> ",user)
        axios.get('/api/users?username=' + User + '&currentUser=' + user).then((response) => { 
            setProfileInfo(response.data.userDoc) 
            // setIsFollowing()
            // console.log("following -> ",response.data.following)
            setIsFollowing(!!response.data.following)
        })

    }

    useEffect(() => {

        getUserData();
    
    }, [status])

    useEffect(() => {
        if (!profileInfo?._id) {
            return;
        }
        axios.get('/api/posts?author=' + profileInfo?._id)
            .then((response) => {
                setPosts(response.data.posts);
                setLikedByMe(response.data.likeByMe)
            });

    }, [profileInfo])

    const UpdateProfile = (e) => {
       e.preventDefault();
       console.log('username-> ',name,"nick-> ",nick,"bio-> ",bio);
       e.preventDefault();
       axios.put('/api/profile?user='+session?.user?.id,{nick,bio,name})
       .then((response)=> {
        setProfileInfo(response.data.CurrentUser);
        getUserData();
       })
       setEditMode(false);
    }
    const toggleFollow = () => {
        axios.post('/api/followers?user='+session?.user?.id,{dest:profileInfo._id})
        setIsFollowing(!isFollowing);
    }

    return (

        <Layout>
            {!!profileInfo && (
                <div>
                    
                    <div className="px-5 pt-2">

                        <Link href="/" className="font-bold flex gap-x-2 mb-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg><div>{profileInfo.name}</div>
                        </Link>
                    </div>
                    <Cover cover={profileInfo.cover} editable={isMyProfile}/>
                    <div className="flex justify-between">
                        <div className="ml-5 relative">
                            <div className="flex justify-center items-center border-black border-4 overflow-hidden rounded-full w-24 h-24 cursor-pointer absolute -top-12 ">
                              
                                <Avatar big src={profileInfo?.image} editable={isMyProfile} className={" overflow-hidden "}/>
                              
                            </div>
                        </div>

                        <div className="p-2">
                            { !isMyProfile && (
                             <>
                             
                            <button onClick={toggleFollow} className={(isFollowing? ' bg-twitterWhite text-black ' : ' bg-twitterBlue text-twitterWhite ') +  " rounded-full px-5 py-2"}>
                                {isFollowing ? 'Following': 'Follow'}
                            </button>
                             </>
                            )}

                            { !editMode && isMyProfile && (
                                <button onClick={(()=> setEditMode(true))} className="bg-twitterBlue text-twitterWhite rounded-full px-5 py-2">Edit Profile</button>
                             )}
                             { editMode && (
                                <>
                                <button onClick={()=> setEditMode(false)} className="bg-twitterWhite text-black rounded-full px-5 py-2 mr-2">Cancel</button>
                                <button  onClick={UpdateProfile} className="bg-twitterBlue text-twitterWhite rounded-full px-5 py-2">Save Profile</button>
                                </>
                             )
                             
                             }
                        </div>
                    </div>
                    <div className="px-5 mt-2">

                  { editMode && (
                    <>
                    <input type="text" onChange={(ev)=> setname(ev.target.value)} defaultValue={profileInfo?.name} className="m-1 block px-3 py-1 bg-twitterBorder outline-none rounded-2xl" />
                    <input type="text" onChange={(ev)=> setnick(ev.target.value)} defaultValue={profileInfo?.username} className="m-1 block px-3 py-1 bg-twitterBorder outline-none rounded-2xl" />
                    
                    <textarea onChange={(ev)=> setBio(ev.target.value)} defaultValue={profileInfo?.bio} className="w-full m-1 block px-3 py-1 bg-twitterBorder outline-none rounded-2xl resize-none"/>
                    </>
                  )}
                  
                  { !editMode && (
                    <>
                     <h1 className="font-bold text-xl leading-2 ">{profileInfo.name}</h1>
                        <h2 className="text-sm text-twitterLightGray">@{profileInfo.username}</h2>
                        <div className="text-sm mt-2 mb-2">{profileInfo?.bio}</div>
                        {/* <div className="text-sm mt-2 mb-2"></div> */}

                    </>
                  )}

                        {/* <h1 className="font-bold text-xl leading-2 ">{profileInfo.name}</h1>
                        <h2 className="text-sm text-twitterLightGray">@{profileInfo.username}</h2>
                        <div className="text-sm mt-2 mb-2">Mars & Cars, Chips and Dips</div>
                    </div> */}

                </div>
                </div>
            
            )}


            {posts?.length > 0 && posts.map((post, id) => (
                <div className="" key={id}>
                    <div className="border-t border-twitterBorder p-5">
                        <PostContent {...post} likeByMe={likedByMe.includes(post._id)} />
                    </div>
                </div>
            ))}
        

        </Layout>

    )
}

export default ProfilePage;