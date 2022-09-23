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
      setLoading(true);
      const fetchData = async () => {
          const data = await fetch('/api/event')
          const json = await data.json();
          setEvents(json.events);
      }
      fetchData()
      .catch()
  }, [])
  return (
    <div>
      <Head>
        <title>nearMe</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <FilterList />
        <div className="flex mx-auto h-96">
          <Events events={events}/>
          <Map events={events} />
        </div>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  )
}
