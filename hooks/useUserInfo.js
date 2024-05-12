
import axios from "axios";
import { useSession } from "next-auth/react";
import React,{useState,useEffect} from "react";

export default function useUserInfo(){

const [userInfo, setUserInfo] = useState(null);
const {data:session,status:sessionStatus} = useSession();
const [status,setStatus] = useState("loading");

function getUserInfo() {
  if (sessionStatus === "loading") {
    return;
  }
  
  if(!session?.user?.id){
    setStatus('unauthenticated');
    return;
  }

  axios.get("/api/users?id="+session?.user.id)
    .then(({ data }) => {
      setUserInfo(data)
      setStatus("authenticated");
    })
    .catch(err => {
      console.error(err);
    })
}

useEffect(() => {
  getUserInfo();
}, [sessionStatus]);

return {userInfo , setUserInfo ,status};

}
