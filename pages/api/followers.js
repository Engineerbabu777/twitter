import initMongoose from '@/lib/mongoose';
import followerModel from '@/models/Followers';
export default async function handle(req,res){
   await initMongoose();
   
   const { user }= req.query;
   const { dest } = req.body;

   const existing = await followerModel.findOne({destination:dest,source:user});

   if( existing ){

    await followerModel.findOneAndDelete({destination:dest,source:user});
    res.json(null);
   
}else{
    const followed = await followerModel.create({destination:dest,source:user});
    res.json(followed);
   }
   res.end();
   

}