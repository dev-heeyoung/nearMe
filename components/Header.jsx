import Button from './Button'

const Header = () => {
  return (
    <div className="flex">
        <h1>nearMe</h1>
        <Button text="Add Event" href="/login"/>
    </div>
  )
}

export default Header