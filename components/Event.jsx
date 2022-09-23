const Event = ({ event }) => {
  return (
        <a className="flex-none bg-stone-50 border-2 rounded-lg w-100">
            <h1 className="font-bold">{event.title}</h1>
            <div>Capacity: {event.capacity > 0 ? event.capacity : "No Limit"} </div>
            <div>{event.startTime}</div>
            <div>{event.endTime}</div>
            <div>{event.description}</div>
            <div className="">{event.latitude} / {event.longitude} 주소로바꿔야함</div> 
        </a>
  )
}

export default Event
