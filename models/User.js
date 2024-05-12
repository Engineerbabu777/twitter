import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    image: String,
    username: String,
    cover:String,
    bio:String,
});

const UserModel = mongoose?.models?.user || mongoose.model("user",UserSchema);

export default UserModel;