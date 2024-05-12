import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
},
    { timestamps: true },
);

const likesModel = mongoose.models?.like || mongoose.model('like', likeSchema);

export default likesModel;