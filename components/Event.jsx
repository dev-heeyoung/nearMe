const Event = ({ event }) => {
  return (
    <div className="flex-none bg-stone-50 border-2 rounded-lg">
        <h1 className="font-bold">{event.title}</h1>
        <div>{event.description}</div>
        <div>{event.startTime}</div>
        <div>{event.endTime}</div>
        <div>{event.latitude} / {event.longitude} </div>
        <div>{event.participants} / {event.capacity} </div>
        <div>{event.availability}</div>
    </div>
  )
}

export default Event
