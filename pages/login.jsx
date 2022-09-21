import { useForm } from "react-hook-form";
import Link from "next/link"

import Input from '../components/Input'

export default function LogIn () {
  const { register, handleSubmit, reset } = useForm();
  const onValid = (data) => {
    console.log(data)
  }
  return (
    <div className="text-center max-w-screen-md">
      <div className="border p-10">
        <h3>
          nearMe
        </h3>
        <form onSubmit={handleSubmit(onValid)}>
          <div>
            <Input label="Email address" name="email" kind="email" type="email" register={register("email")} required/>
            <Input label="Password" name="password" kind="password" type="password" register={register("password")} required/>
          </div>
          <div className="bg-red-600 text-white rounded">
              <button>Continue</button>
          </div>
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
