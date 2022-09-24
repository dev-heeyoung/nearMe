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
    var div  = document.getElementById("location");
    const getLocation = async() => {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
      } else {
        div.innerHTML = "The Browser Does not Support Geolocation";
      }
    }

    const showPosition = async(position) => {
      div.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    }

      const fetchData = async () => {
          const data = await fetch('/api/event')
          const json = await data.json();
          setEvents(json.events);
          setLoading(true);
      }
      
      getLocation();
      fetchData()
      .catch()
  }, [isLoading])
  console.log(Array.isArray(events))


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
              <Map events={events} />
            </div>
          </div>
        </div>
      </main>
      <footer className="">
      <Footer />
        <div id="location"></div>
      </footer>
    </div>
  )
}
