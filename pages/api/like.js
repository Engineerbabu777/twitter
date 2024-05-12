import initMongoose from '@/lib/mongoose';
import likesModel from '@/models/Like';
import PostModel from '@/models/Post';

async function updateLikes(id){
    const Post = await PostModel.findById(id);
    Post.likeCount = await likesModel.countDocuments({post:id});
    await Post.save()
}
export default async function handler(req, res) {
    await initMongoose();
    const { id, currentUser } = req.body;
    const postId = id;
    const userId = currentUser;
    const existingLike = await likesModel.findOne({ author: userId, post: postId });

    if (existingLike) {
        await existingLike.deleteOne();
        await updateLikes(id)
        res.json(null);
    } else {
        const liked = await likesModel.create({ author: userId, post: postId });
        await updateLikes(id)
        res.json({ liked });
    }

    res.end();
}