import Event from './Event'

const Events = ({ events }) => {
  return (
    <ul className="w-1/2 h-96">
        {events?.map((event) => <li key={event.id}><Event event={event}/></li>)}
    </ul>
  )
}

export default Events