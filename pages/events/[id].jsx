import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import Event from '../../components/Event'
import Header from '../../components/Header'

export default function EventDetail() {
    const [event, setEvent] = useState(undefined);
    const router = useRouter();

    let {
      isReady,
      query: {
        id,
      }
    } = router;
    console.log(isReady)

    useEffect(() => {
      if (!isReady) {
        console.log('Router not ready')
        return;
      }
      const fetchData = async () => {
        const data = await fetch(`/api/events/${id}`)
        const json = await data.json();
        console.log(json)
        setEvent(json);

      }
      fetchData()
      .catch()
    }, [isReady])

    console.log(event)
   
    return (
      <div>
      <Header type='detail'/>
        <div className="text-center max-w-screen-md mx-auto mt-10 shadow-lg">
        <h2 className="m-10 p-10">Event Detail</h2>
          <div className="w-1/2 mx-auto">
            {event ? (
              <>
              <div>{event.title}</div>
              <div>{event.startTime} - {event.endTime}</div>
              <div>Capacity: {event.Capacity}</div>
              <div>{event.description}</div>
              </>
            ): (<div>No Events Found</div>)}
          </div>
        </div>
      </div>
    )
}


