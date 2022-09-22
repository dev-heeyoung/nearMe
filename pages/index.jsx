import Head from 'next/head'

import Header from '../components/Header'
import FilterList from '../components/FilterList'
import Events from '../components/Events'
import Map from '../components/Map'
import Footer from '../components/Footer'

export default function Home() {
  const events = [
    {
      id: 1,
      title: "event1",
      description: "description",
      startTime: "2022-09-24 00:00:00",
      endTime: "2022-09-24 00:00:00",
      latitude: 1.1,
      longitude: 1.1,
      capacity: 5,
      participants: 3,
      availability: false,
    },
    {
      id: 2,
      title: "event2",
      description: "description",
      startTime: "2022-09-24 00:00:00",
      endTime: "2022-09-24 00:00:00",
      latitude: 1.1,
      longitude: 1.1,
      capacity: 5,
      participants: 3,
      availability: false,
    },
    {
      id: 3,
      title: "event3",
      description: "description",
      startTime: "2022-09-24 00:00:00",
      endTime: "2022-09-24 00:00:00",
      latitude: 1.1,
      longitude: 1.1,
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
        <Header />
        <FilterList />
        <div className="flex mx-auto">
          <Events events={events}/>
          <Map events={events}/>
        </div>
      </main>
      <footer className="">
        <Footer />
      </footer>
    </div>
  )
}
