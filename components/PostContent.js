import ReactTimeAgo from 'react-time-ago'
import Link from 'next/link';
import PostButtons from './PostButtons';
import Avatar from './Avatar'

const PostContent = ({ createdAt, text, images, author, _id, likeByMe, likeCount, commentCount, big = false }) => {

    const showImages = () => {
        return (
            <div className='flex w-full flex-wrap '>
                {images.length > 0 && images.map((image, id) => (
                    <div key={id} className="" >
                         <img src={image} alt='image' />
                     </div>
                ))
                }
            </div>
        )
    }

    return (

        <div>
            <div className="flex w-full">
                <div className="rounded-full overflow-hidden w-14">
                    <div className="rounded-full overflow-hidden w-14">

                        {
                            author?.image && (
                                <>

                                    <div className="flex justify-center items-center  object-fit overflow-y-hidden rounded-full w-12 h-12 cursor-pointer">
                                        <Link href={`/@${author.username}`}>
                                            <Avatar src={author?.image} />
                                        </Link>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className="pl-2 grow">
                    <div className="">
                        <Link href={`/@${author?.username}`}>
                            <span className="font-bold pr-2 cursor-pointer">{author?.name}</span>
                        </Link>
                        {
                            big && (<br />)
                        }
                        <Link href={`/@${author?.username}`}>
                            <span className="cursor-pointer text-sm text-twitterLightGray">@{author?.username}</span>
                        </Link>
                        {!big && (
                            <span className=" pl-1 text-sm text-twitterLightGray"><ReactTimeAgo timeStyle={'twitter'} date={new Date(createdAt)} /></span>
                        )

                        }

                    </div>

                    {!big && (
                        <div >
                            <Link href={`/${author?.username}/status/${_id}`}>
                                <div className="w-full">
                                    {text}
                                    <div className="min-w-sm max-w-md ">
                                    {
                                        showImages()
                                    }
                                    </div>

                                </div>
                            </Link>
                            <PostButtons id={_id} likeCount={likeCount} username={author?.username} likedByMe={likeByMe} commentCount={commentCount} />
                        </div>

                    )}

                </div>

            </div>
            {big && (
                <div className="mt-2">
                    <Link href={`/${author?.username}/status/${_id}`}>
                        <>
                            {text}
                            {
                                showImages()
                            }
                        </>
                    </Link>
                    <div className="text-twitterLightGray text-sm ">
                        {(<> {(new Date(createdAt)).toISOString().replace('T', ' ').slice(0, 19).split(' ').reverse().join(' ')} </>)}
                    </div>
                    <PostButtons id={_id} likedByMe={likeByMe} username={author?.username} commentCount={commentCount} />
                </div>
            )}
        </div>

    )
}

export default PostContent;

// create a rectangle with 3 div in html+css?



