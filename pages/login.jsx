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
      router.push(redirect || '/');
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
    <div className="text-center max-w-screen-md">
      <div className="border p-10">
        <h3>
          nearMe
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div>
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
          </div>
          <div className="bg-red-600 text-white rounded">
              <button>Continue</button>
          </div>
          <div>{error}</div>
        </form>
      </div>
      <div>
        <h5 className="text-center">New to nearMe?</h5>
        <Link href="/register">
          <a className="bg-red-600 text-white rounded">Create your account</a>
        </Link>
      </div>
    </div>

  )
}
