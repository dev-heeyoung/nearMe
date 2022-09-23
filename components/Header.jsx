import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

import Image from 'next/image'
import Button from './Button'
import FilterBtn from './FilterBtn'
import FilterList from './FilterList'

const Header = () => {
    const { data: session } = useSession();
    console.log(session)
  return (
           <div class = "grid grid-cols-12 grid-flow-col">
            <div class = "col-span-3" id="img_logo">
                <img src="/teamLogo.jpg"/>
            </div>

            <div class ="col-span-9 flex flex-row-reverse">
                <div id="btn_signout" class = "">
                    {session?.user ? (
                        <Link href="/">
                            <a className="bg-red-600 text-white" onClick={e => {
                                e.preventDefault()
                                signOut()
                            }}>Sign Out</a>
                        </Link>
                    ) : (<></>)}
                </div>
                <div id="btn_addEvent">
                    <Button text="Add Event" href={session?.user? "/events/upload" : "/login"} />
                </div>
            </div>
        </div>
  )
}

export default Header