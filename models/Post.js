import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {type:mongoose.Schema.Types.ObjectId , ref:"user"},
    text:String,
    likeCount: {type:Number , default:0},
    commentCount: {type:Number , default:0},
    parent: {type:mongoose.Schema.Types.ObjectId , ref:"post"},
    images:{type:[String]},

},{timestamps:true});

const PostModel = mongoose?.models?.post || mongoose.model('post',postSchema);

export default PostModel;