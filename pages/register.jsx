import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Link from "next/link"
import { useForm } from "react-hook-form";
import Input from '../components/Input'

export default function Register () {
    const { register, handleSubmit, getValues, formState: {errors} } = useForm();
    const [ data, setData ] = useState(undefined);
    const [ error, setError ] = useState(undefined);

    const router = useRouter();
    const { redirect } = router.query;

    const onValid = (data) => {
        fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json().catch(() => {})
        .then(setData)
        .then()
        .then(() => 
            router.push(redirect || '/login')
        )
        .catch(setError))
    }

  return (
    <div className="text-center max-w-screen-md">
      <div className="border p-10">
        <h3>
          nearMe
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div>
            <Input label="First name" name="firstName" kind="text" type="text" register={register("firstName", {
                required: 'Please enter first name',
            })} 
            required />
            {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
            )}
            <Input label="Last name" name="lastName" kind="text" type="text" register={register("lastName", {
                required: 'Please enter last name',
            })} required />
            {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
            )}
            <Input label="Email address" name="email" kind="email" type="email" register={register("email", {
                required: 'Please enter email',
                pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
                },
            })} 
                required/>
            {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
            )}  
            <Input label="Password" name="password" kind="password" type="password" register={register("password", {
                required: 'Please enter password',
                minLength: {
                    value: 6,
                    message: 'Password should be more than 5 chars',
                }
            })} 
            required/>
            {errors.confirmPassword && (
                <div className="text-red-500 ">
                {errors.confirmPassword.message}
                </div>
            )}
            <Input label="Password Confirm" name="confirmPassword" kind="password" type="password" register={register("confirmPassword", {
                required: 'Please enter confirm password',
                validate: (value) => value === getValues('password'), 
                minLength: {
                  value: 6,
                  message: 'Password should be more than 5 chars',
                },
            })} required/>
            {errors.password && (
                <div className="text-red-500 ">
                {errors.password.message}
                </div>
            )}
            {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Password do not match</div>
            )}
          </div>
          <div className="bg-red-600 text-white rounded">
              <button>Continue</button>
          </div>
        </form>
        <div>
        <h5 className="text-center">Have an account?</h5>
        <Link href="/login">
          <a className="bg-red-600 text-white rounded">Sign In</a>
        </Link>
      </div>
      </div>
    </div>

  )
}
