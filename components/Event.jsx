const Event = ({ event }) => {
  return (
        <a className="flex-none mg-3" href={`events/${event.id}`}>
            <h1 className="font-bold text-xl mb-3 pl-2">{event.title}</h1>
            <div className="flex m-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="italic text-sm mb-2 pl-1">Capacity: {event.capacity > 0 ? event.capacity : "No Limit"} </div>
            </div>
            <div className="flex m-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="mb-1">{event.startTime.slice(0, 10)} {event.startTime.slice(11, 16)} - {event.endTime.slice(0, 10)} {event.endTime.slice(11, 16)} </div>
            </div>
            <div className="italic text-sm mb-4 pl-3">{event.description.length > 250 ? `${event.description.slice(0, 250)}...` : event.description}</div>
            <div className="flex m-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>{event.address}</div>
                </div>
        </a>
  )
}

export default Event