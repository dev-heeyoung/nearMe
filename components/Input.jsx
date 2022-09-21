const Input = ({ 
    label,
    name,
    kind,
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
        { kind === "email" ? (
        <div>
            <input
                id={name}
                type={type}
                {...register}
                required={required}
                className="border rounded"
            />
        </div>
        ) : null }
        { kind === "password" ? (
        <div>
            <input
                id={name}
                type={type}
                {...register}
                required={required}
                className="border rounded"
                />
        </div> 
        ) : null }
    </div>
  )
}

export default Input