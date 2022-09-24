import Event from './Event'

const Events = ({ events }) => {
  return (
    <ul className="overflow-auto border min-h-full mr-2 p-2">
        {events?.map((event) => <li className="p-4 mb-3 bg-slate-50 shadow-lg rounded" key={event.id}><Event event={event}/></li>)}
    </ul>
  )
}

export default Events