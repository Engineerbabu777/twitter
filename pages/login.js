import { getProviders, signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login({ providers }) {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) { // user is already available 
    router.push('/');
  }
  
  return (
    <div className="flex justify-center items-center h-screen text-red-600">
      {
        Object.values(providers).map((provider, id) => (
          <div key={id}>
            <button onClick={async () => await signIn(provider.id)} className="bg-twitterWhite py-2 pl-3 pr-5 text-black rounded-full flex items-center">
              <img src={"google.png"} alt="pic" className="w-8" />
              Sign in with {provider.name}</button>
          </div>
        ))}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  }
}
