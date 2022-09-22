import { signOut, useSession } from "next-auth/react"
import Link from "next/link"


import Button from './Button'

const Header = () => {
    const { data: session } = useSession();
    console.log(session)
  return (
    <div className="flex">
        <h1>nearMe</h1>
        {session?.user ? (
            <Link href="/">
                <a className="bg-red-600 text-white" onClick={e => {
                    e.preventDefault()
                    signOut()
                }}>Sign Out</a>
            </Link>
        ) : (<></>)}
        
       
        <Button text="Add Event" href={session?.user? "/events/upload" : "/login"} />
    </div>
  )
}

export default Header