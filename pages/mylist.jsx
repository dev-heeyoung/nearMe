import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import { useRouter } from "next/router";

import Event from '../components/Event'
import Header from '../components/Header'
//import Button from '../components/Button'


export default function MyList() {
    const [events, setEvents] = useState(undefined)
    const [isLoading, setLoading] = useState(false)
    const session = useSession();
    const router = useRouter();

    const removeEventHandler = async (event) => {
        fetch(`api/events/${event.id}`, {
            method: "DELETE",
            body: JSON.stringify(event),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .catch(events)
    }

    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            const data = await fetch('/api/host/events')
            const json = await data.json();
            setEvents(json.events);
        }
        fetchData()
        .catch()
    }, [events])

  
    return (
         
        <div className="container mx-auto mt-10 space-y-8">
            <Header type="mylist"/>
            <h1 className="text-center text-4xl p-12 text-cyan-800 font-bold">My Events</h1>
            <ul className="mx-auto max-w-screen-sm pb-28">
                {events?.map((event) => 
                    <li key={event.id.toString()}>
                        <div className="flex justify-between bg-slate-50 shadow-lg rounded mb-5 px-5 py-2">
                            <div className="p-4 mb-3">
                                <Event event={event}/>
                            </div>
                            <div className="self-center">
                                <button className="bg-red-600 text-white rounded w-24 h-8" onClick={() => removeEventHandler(event)}>
                                    Delete
                                </button>
                            </div>
                        </div>   
                    </li>)}
            </ul>
        </div>
    )
}

// export async function getServerSideProps() {
//     const session = await getSession({ req });
//     const { user } = session;
//     const events = await client.event.findMany({
//         where: {
//             id: user.id
//         }
//     });
//     return {
//       props: {
//         event: JSON.parse(JSON.stringify(events)),
//       },
//     };
//   }