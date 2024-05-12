
import initMongoose from '@/lib/mongoose';
import UserModel from '@/models/User';

export default async function handle(req,res){
   await initMongoose();
   
   const {user} = req.query;
   const {bio,name,nick} = req.body;
    // const currentUser = await UserModel.findById(user);
   const CurrentUser = await UserModel.findByIdAndUpdate(user,{username:nick,name:name,bio:bio});
   
//    console.log(bio,nick,name);
   res.json({CurrentUser});


}