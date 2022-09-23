import Event from './Event'

const Events = ({ events }) => {
  console.log('props')
  console.log(events)
  return (
    <div className="w-1/2 h-96">
        {events?.map((event, index) => <article><Event key={index} event={event}/></article>)}
    </div>
  )
}

export default Events