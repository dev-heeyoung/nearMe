const Input = ({ 
    label,
    name,
    register,
    type,
    required,
}) => {
  return (
    <div className="flex flex-col">
        <label 
            htmlFor={name}
            className="mt-5" 
            >
            {label}
        </label>
        { name === 'distance' ? (
            <input
                id={name}
                type={type}
                step="0.01"
                {...register}
                required={required}
                className="border rounded m-3"
            />
        ) : (
            <input
                id={name}
                type={type}
                {...register}
                required={required}
                className="border rounded mt-2 mb-2 w-4/5 px-2 py-1 flex mx-auto"
            />
        )}

    </div>
  )
}

export default Input