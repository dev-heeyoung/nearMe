import Event from './Event'

const Events = ({ events }) => {
  return (
    <ul className="overflow-auto">
        {events?.map((event) => <li key={event.id}><Event event={event}/></li>)}
    </ul>
  )
}

export default Events