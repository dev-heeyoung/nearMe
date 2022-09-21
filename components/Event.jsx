const Event = ({ event }) => {
  return (
    <div className="border">
        <h1>{event.title}</h1>
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
