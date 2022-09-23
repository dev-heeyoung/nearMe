import Event from './Event'

const Events = ({ events }) => {
  return (
    <div clss= "overflow-auto">
        {events?.map((event, index) => <div class=""><article><Event key={index} event={event}/></article></div>)}
      </div>
  )
}

export default Events