
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions=({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
  pages:{
    signIn: "/login",
  },
  session:{
    strategy: "jwt",
  },
  callbacks: {
    session: async({token,session})=> {
       if(session?.user && token?.sub){
        session.user.id = token.sub;
       }
       return session;
    }
  }
})

export default NextAuth(authOptions);