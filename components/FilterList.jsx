const FilterList = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <input className="bg-[#b8b8b846] box-content h-10 w-50 border-none outline-none rounded-lg" placeholder="Search anything" />
        <button className="bg-gradient-to-r from-emerald-400 to-emerald-700 hover:from-stone-50 hover:to-stone-10 border-2 
        px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-emerald-600 hover:border-2
         hover:border-emerald-600">Search</button>
      </div>
    </div>
  )
}

export default FilterList