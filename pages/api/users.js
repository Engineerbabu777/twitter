
import initMongoose from "@/lib/mongoose";
import UserModel from "@/models/User";
import {getServerSession } from "next-auth";
import {authOptions}  from "./auth/[...nextauth]";
import followerModel from "@/models/Followers";

export default async function handler(req, res) {
    await initMongoose();

    if(req.method==="GET"){
        const { id , username , currentUser } = req.query;
        
        // console.log(session);
        if(id){
            const userDoc = await UserModel.findById(id);
             
            res.json({ userDoc });
            
        }else{
            const userDoc = await UserModel.findOne({username});
            const following = await followerModel.findOne({destination:userDoc?._id,source:currentUser});
            res.json({ userDoc , following });
        
        }
        // res.json({ userDoc });
    }
    
    if (req.method === "PUT") {
        const { id } = req.query;
        const { userName } = req.body;
        await UserModel.findByIdAndUpdate(id, { username: userName });
        const updatedUserDoc = await UserModel.findById(id);
        
        res.json({ updatedUserDoc,userName });
    }
}