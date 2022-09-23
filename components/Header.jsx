import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router";

import Button from './Button'

const Header = ({ type }) => {
    const { data: session } = useSession();
    const { router } = useRouter();

  return (
    <div className="flex">
        <Link href="/">
            <h1>nearMe</h1>
        </Link>
        {session?.user ? (
            <Link href="/">
                <a className="bg-red-600 text-white" onClick={e => {
                    e.preventDefault()
                    signOut()
                }}>Sign Out</a>
            </Link>
        ) : <></>}

        { type !== 'mylist' ? (
            <Button text="My Events" href={session?.user? "/mylist" : "/login"} />
        ) : <></>}
        
        { type === 'home' || type === 'mylist' || type =='detail' ? 
        (<Button text="Add Event" href={session?.user? "/events/upload" : "/login"} />) 
        : (<></>)}

        { type === ''}
        
    </div>
  )
}

export default Header