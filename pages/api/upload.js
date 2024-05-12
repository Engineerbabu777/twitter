import initMongoose from '@/lib/mongoose';
import UserModel from '@/models/User';

export default async function handle(req,res){
   initMongoose();
   if(req.method === "POST"){
       const {user,upload,type} = req.body;
       
       if(!type){
        res.json()
       }

       const currentUser = await UserModel.findById(user);
       currentUser[type] = upload;
       currentUser.save();

       res.json(currentUser);
   }
    


}

