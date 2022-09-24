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
    <div className="text-center max-w-screen-sm mx-auto">
      <div className="shadow-lg p-10 m-3">
      <div className="w-56 mx-auto mt-3 cursor-pointer">
              <Link href="/">
                <img src="teamLogo.jpeg"/>
              </Link>
          </div>
        <form className="m-5" onSubmit={handleSubmit(onValid)}>
          <div className="m-10">
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
          <div className="w-3/5 mx-auto m-3 cursor-pointer bg-cyan-800 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-bg-inherit hover:border-2 hover:border-cyan-900">
              <button>Continue</button>
          </div>
        </form>
      <div className="mt-10">
        <h5 className="text-center">Have an account?</h5>
        <Link href="/login">
          <a className="text-blue-600/100 underline">Sign In</a>
        </Link>
      </div>
      </div>
    </div>

  )
}
