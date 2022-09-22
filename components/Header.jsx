import Image from 'next/image'
import Button from './Button'
import FilterBtn from './FilterBtn'
import FilterList from './FilterList'

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row m-5 justify-around
    items-center">
        <Image 
          className="object-contain"
          src="/teamLogo.JPG"
          width={200}
          height={150}
        />
      <div className="flex">
        <Button text="Add Event" href="/login"/>
        <FilterBtn text="Caterory"/>
        <FilterBtn text="All upcoming"/>
        
      </div>
      <div>
        <FilterList />
      </div>
    </header>
  )
}

export default Header