import Head from 'next/head'
import Header from '../components/Header'
import FilterList from '../components/FilterList'
import Events from '../components/Events'
import Map from '../components/Map'
import Footer from '../components/Footer'

export default function Home() {
  const events = [{
    id: 1,
    title: "Soul Cafe",
    description: "description",
    startTime: "2022-09-24 00:00:00",
    endTime: "2022-09-24 00:00:00",
    latitude: 43.78682775424458,
    longitude: -79.41771376155737,
    capacity: 5,
    participants: 3,
    availability: false,
  },
  {
    id: 2,
    title: "Finch Station",
    description: "description",
    startTime: "2022-09-24 00:00:00",
    endTime: "2022-09-24 00:00:00",
    latitude: 43.780300572228875,
    longitude: -79.41585241539359,
    capacity: 5,
    participants: 3,
    availability: false,
  },
  {
    id: 3,
    title: "Seneca College",
    description: "description",
    startTime: "2022-09-24 00:00:00",
    endTime: "2022-09-24 00:00:00",
    latitude: 43.796259859304776,
    longitude: -79.34851251318761,
    capacity: 5,
    participants: 3,
    availability: false,
  
  }
  ]
  return (
    <div>
      <Head>
        <title>nearMe</title>
        <meta name="" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div class="container max-width mt-10 space-y-8">
          <Header />
          <div class = "grid grid-cols-12" style= {{height:450 +'px'}}>
            <div class = "col-span-4 overflow-auto" id ="div_eventList">
              <Events events={events}/>
            </div>
            <div class = "col-span-8" id ="map">
              <Map events={events} />
            </div>
          </div>
        </div>
      </main>
     
      <div id="eventDetail"></div>
        <footer className="">
          <Footer />
        </footer>
    </div>
  )
}
