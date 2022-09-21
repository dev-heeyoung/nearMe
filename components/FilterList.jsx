import FilterBtn from './FilterBtn'

const FilterList = () => {
  return (
    <div>
      <div>
        <input className="border" placeholder="Search anything" />
        <button className="rounded cursor-pointer bg-red-600 text-white">Search</button>
      </div>
      <div>
        <FilterBtn text="Caterory"/>
        <FilterBtn text="All upcoming"/>
      </div>
    </div>
  )
}

export default FilterList