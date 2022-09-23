import Head from 'next/head'
import { useState, useEffect } from "react"

import Header from '../components/Header'
import Events from '../components/Events'
import Map from '../components/Map'
import Footer from '../components/Footer'


export default function Home() {
  const [events, setEvents] = useState(undefined)
  const [isLoading, setLoading] = useState(false)

  useEffect( () => {
      
      const fetchData = async () => {
          const data = await fetch('/api/event')
          const json = await data.json();
          setEvents(json.events);
          setLoading(true);
      }
      fetchData()
      .catch()
  }, [isLoading])
  console.log(Array.isArray(events))
  //console.log(events.length)
  return (
    <div>
      <Head type="home">
        <title>nearMe</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="container max-width mt-10 space-y-8">
        <Header type="home"/>
          <div className = "grid grid-cols-12" style= {{height:450 +'px'}}>
            <div className = "col-span-4 overflow-auto" id ="div_eventList">
            { events? (<Events events={events}/>) : (<div>No Events Found</div>)}
            </div>
            <div className = "col-span-8" id ="map">
              <Map events={events} />
            </div>
          </div>
        </div>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  )
}
