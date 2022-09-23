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
         
        <div className="">
            <Header type="mylist"/>
            <ul className="mx-auto">
                {events?.map((event) => 
                    <li key={event.id.toString()}>
                        <div className="grid grid-col-5">
                            <div className="col-start-1 col-end-2">
                                <Link href={`/events/${event.id}`}>
                                    <Event event={event}/>
                                </Link>
                            </div>
                            <div className="col-end-2">
                                <button onClick={() => removeEventHandler(event)}>
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