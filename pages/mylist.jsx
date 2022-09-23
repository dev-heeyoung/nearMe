import { useState, useEffect } from "react"
import Link from 'next/link'

import Event from '../components/Event'
import Header from '../components/Header'
//import Button from '../components/Button'


export default function MyList() {
    const [events, setEvents] = useState(undefined)
    const [isLoading, setLoading] = useState(false)

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
        <>
            <Header type="mylist"/>
            <ul className="w-1/2">
                {events?.map((event) => 
                    <li key={event.id.toString()}>
                        <Link href={`/events/${event.id}`}>
                            <Event  event={event}/>
                        </Link>
                        <button onClick={() => removeEventHandler(event)}>
                            Delete
                        </button>   
                    </li>)}
            </ul>
        </>
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