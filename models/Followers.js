import mongoose from "mongoose";

const followerSchema = new mongoose.Schema({
   
   source: {type: mongoose.Schema.Types.ObjectId, required:true},
   destination: {type: mongoose.Schema.Types.ObjectId, required:true},

});

const followerModel = mongoose.models?.follower || mongoose.model('follower',followerSchema);

export default followerModel;