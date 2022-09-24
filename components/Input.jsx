const Input = ({ 
    label,
    name,
    register,
    type,
    required,
    ...rest
}) => {
  return (
    <div className="flex flex-col">
        <label 
            htmlFor={name}
            className="mt-5" 
            >
            {label}
        </label>

        <input
                id={name}
                type={type}
                {...register}
                {...rest}
                required={required}
                className="border rounded mt-2 mb-2 w-4/5 px-2 py-1 flex mx-auto"
            />           
        </div>
  )
}

export default Input