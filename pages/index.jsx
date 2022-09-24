import Head from 'next/head'
import { useState, useEffect } from "react"

import Header from '../components/Header'
import Events from '../components/Events'
import Map from '../components/Map'
import Footer from '../components/Footer'


export default function Home() {
  const [events, setEvents] = useState(undefined)
  const [isLoading, setLoading] = useState(false)
  const [lat, setLat] = useState(undefined)
  const [lon, setLon] = useState(undefined)

  useEffect( () => {
    const getLocation = async() => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          if (lat && lon) {
            setLat(lat);
            setLon(lon);
          }
        })
      } else {
        alert("The Browser Does not Support Geolocation");
      }
    }

      const fetchData = async () => {
          const data = await fetch(`/api/event?lat=${lat}&long=${lon}`)
          const json = await data.json();
          setEvents(json.events);
          setLoading(true);
      }
      
      getLocation().then(fetchData())
      
  }, [isLoading, lat, lon])
  

  return (
    <div>
      <Head type="home">
        <title>nearMe</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="container mx-auto mt-10 space-y-8">
        <Header type="home"/>
        <h1 className="text-center text-xl italic text-cyan-800 font-bold">Build connection with your neighborhood</h1>
        <div className = "grid grid-cols-12" style= {{height:550 +'px'}}>
            <div className = "col-span-4 overflow-scroll" id ="div_eventList">
            { events? (<Events events={events}/>) : (<div>No Events Found</div>)} 
            </div>
            <div className = "col-span-8" id ="map">
              <Map events={events} lon={lon} lan={lat}/>
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
