import { useState, useEffect } from "react"
import Event from '../components/Event'

export default function MyList() {
    const [events, setEvents] = useState(undefined)
    const [isLoading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true);
        const fetchData = async () => {
            const data = await fetch('/api/host/events')
            const json = await data.json();
            setEvents(json.events);
        }
        fetchData()
        .catch()
    }, [])
  
    return (
        <div className="w-1/2">
            {events?.map((event, index) => <article><Event key={index} event={event}/></article>)}
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
//         products: JSON.parse(JSON.stringify(events)),
//       },
//     };
//   }