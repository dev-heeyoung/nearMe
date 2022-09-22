const Input = ({ 
    label,
    name,
    register,
    type,
    required,
}) => {
  return (
    <div>
        <label
            htmlFor={name}>
            {label}
        </label>
        { name === 'distance' ? (
            <div>
            <input
                id={name}
                type={type}
                step="0.01"
                {...register}
                required={required}
                className="border rounded"
            />
            </div>
        ) : (
            <div>
            <input
                id={name}
                type={type}
                {...register}
                required={required}
                className="border rounded"
            />
            </div>
        )}

    </div>
  )
}

export default Input