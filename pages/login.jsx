import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import { toast } from 'react-toastify';
import Link from "next/link"

import Input from '../components/Input'

export default function LogIn () {
    const { register, handleSubmit, getValues, formState: {errors} } = useForm();
  const [ data, setData ] = useState(undefined);
  const [ error, setError ] = useState(undefined);
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || 'events/upload');
    }
  }, [router, session, redirect]);

  const onValid = async (data) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }    
  };
  return (
    <div className="text-center max-w-screen-sm mx-auto">
      <div className="shadow-lg p-10 m-10">
        <h3 className="p-10">
          nearMe
        </h3>
        <form className="m-5" onSubmit={handleSubmit(onValid)}>
          <div className="m-10">
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
            {errors.password && (
                <div className="text-red-500 ">
                {errors.password.message}
                </div>
            )}
          </div>
          <div className="w-3/5 mx-auto m-3 cursor-pointer bg-cyan-800 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-bg-inherit hover:border-2 hover:border-cyan-900">
              <button>Continue</button>
          </div>
          <div className="text-red-600">{error}</div>
        </form>
      </div>
      <div>
        <h5 className="text-center">New to nearMe?</h5>
        <Link href="/register">
          <a className="text-blue-600/100 underline">Create your account</a>
        </Link>
      </div>
    </div>

  )
}
