import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function UsernameForm() {
    const [userName, setUserName] = useState("");
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    useEffect(() => {
    
           let defaultUserName = (session?.user.email).split('@')[0];
           defaultUserName = defaultUserName?.replace(/[^a-z]+/gi, "");
           setUserName(defaultUserName);

    
    }, [sessionStatus]);

    const handleSubmitForm = (ev) => {
        ev.preventDefault();
            console.log(session?.user.id);
            axios.put(`/api/users?id=${session?.user?.id}`, { userName })
            .then(({ data }) => console.log(data))

        router.reload();
    }

    return (
        <form className="flex justify-center items-center h-screen overflow-x-hidden" onSubmit={handleSubmitForm}>
            <div className="text-center">
                <h1 className="text-2xl ">Pick a username</h1>
                <input placeholder="username.." onChange={(ev) => setUserName(ev.target.value)} value={userName} className="block mt-2 bg-twitterBorder px-3 py-1 focus:outline-none rounded-full" type="text" />
                <button type="submit" className="bg-twitterBlue w-full px-3 py-1 mt-2 rounded-full">Continue</button>
            </div>
        </form>
    )
}