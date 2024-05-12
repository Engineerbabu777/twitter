import mongoose from 'mongoose';

export default async function initMongoose() {

    if(mongoose.connection.readyState == 1){
     return mongoose.connection.asPromise();
    }else{
        await mongoose.connect(process.env.mONGODB_URI);
    }
}