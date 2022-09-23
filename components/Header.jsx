import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


import Button from './Button'

const Header = ({ type }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const [ isSignedOut, setIsSignedOut ] = useState(false);

    useEffect(() => {
        if (!session?.user && isSignedOut) {
            router.push(`/`)
        }
      }, []);
    
  return (
    <div className="flex">
        <div class = "grid grid-cols-12 grid-flow-col">
            <div class = "col-span-3" id="img_logo">
                <Link href="/">
                    <img src="teamLogo.jpeg"/>
                </Link>
            </div>

            <div class ="cl-span-9 flex flexo-row-reverse">
                <div id="btn_signout" class = "">
                    {session?.user ? (
                        <a className="cursor-pointer bg-cyan-800 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-bg-inherit hover:border-2 hover:border-cyan-900" 
                            onClick={e => {
                                e.preventDefault()
                                signOut({redirect: false})
                                router.push(`/`)
                                setIsSignedOut(true);
                                }}>Sign Out</a>
                    ) : (<></>)}
                </div>
                <div>
                    { type !== 'mylist' && session?.user ? (
                        <Button text="My Events" href={session?.user? "/mylist" : "/login"} />
                    ) : <></>}
                    
                    { type === 'home' || type === 'mylist' || type =='detail' ? (
                    <Button text="Add Event" href={session?.user? "/events/upload" : "/login"} />
                    ) : (<></>)}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header