import { useForm } from "react-hook-form";
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
            <Input label="Password" name="password1" kind="password" type="password" register={register("password1")} required/>
            <Input label="Password Confirm" name="password2" kind="password" type="password" register={register("password2")} required/>
          </div>
          <div className="bg-red-600 text-white rounded">
              <button>Continue</button>
          </div>
        </form>
      </div>
    </div>

  )
}
