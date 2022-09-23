import Head from 'next/head'
import { useState, useEffect } from "react"

import Header from '../components/Header'
import FilterList from '../components/FilterList'
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
        <Header type="home"/>
        <FilterList />
        <div className="flex mx-auto h-96">
          { events? (<Events events={events}/>) : (<div>No Events Found</div>)}
          <Map events={events} />
        </div>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  )
}
