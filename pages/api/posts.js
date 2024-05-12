
import initMongoose from '@/lib/mongoose';
import likesModel from '@/models/Like';
import PostModel from '@/models/Post';
import followerModel from '@/models/Followers';

export default async function handler(req, res) {
    await initMongoose();

    if (req.method === "POST") {
        const { text, id,parent,images } = req.body;
        const PostCreated = await PostModel.create({
            text: text,
            author: id,
            parent,
            images,
        });
        if(parent){
            const parentPosts = await PostModel.findById(parent);
            parentPosts.commentCount = await PostModel.countDocuments({parent});
            await parentPosts.save();
        }
        res.json({ PostCreated });
    }

    if (req.method === "GET") {
        const { id, user ,currentUser} = req.query;
        console.log(`id -> ${id}`);
        console.log(`user || currentUser -> ${user}` )
        console.log(`paramCurrent -> ${currentUser}`);

        if (id) {
            res.json(await PostModel.findById(id).populate('author').populate({path:'parent',populate:'author'}));
            res.end();
        } else {
            const parent = req.query.parent || null ;
            const author = req.query.author || null;
            let searchFilter;
            if(!parent && !author){
                const myFollows = await followerModel.find({source:user}).exec();
                const idsOfPeopleFollow = myFollows.map(f=> f.destination)
                searchFilter = {author: [...idsOfPeopleFollow,user]}
            }
            if(parent){
              searchFilter = {parent}
            }
            if(author){
              searchFilter = {author}
            }
            const posts = await PostModel.find(searchFilter).populate('author').populate({path:'parent',populate:'author'}).sort({ createdAt: -1 }).limit(20).exec();

            const postLikedByMe = await likesModel.find({
                author:user,
                post: posts.map(p => p._id),
            });

            const likeByMe = postLikedByMe.map(like=> like.post);

            res.json({posts,likeByMe});
        }
    }

}