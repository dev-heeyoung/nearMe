import Event from './Event'

const Events = ({ events }) => {
  return (
    <div className="w-1/5">
        {events?.map((event, index) => <article><Event key={index} event={event}/></article>)}
    </div>
  )
}

export default Events