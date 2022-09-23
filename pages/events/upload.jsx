import { useForm } from "react-hook-form";
import { useState } from "react"
import { useRouter } from "next/router"

import Input from "../../components/Input"

export default function Upload() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [ data, setData ] = useState(undefined);
    const [ error, setError ] = useState(undefined);
    const router = useRouter();
    const { redirect } = router.query;
    const onValid = (data) => {
        fetch("/api/event", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => res.json().catch(() => {})
        .then(setData)
        .then(() => 
        router.push(redirect || '/mylist')
        )
        .catch(setError))
    } 
    return (
        <form onSubmit={handleSubmit(onValid)}>
            <Input label="Title" name="title" type="text" register={register("title")} required/>
            <Input label="Distance" name="distance" type="number" register={register("distance")} required/>
            <Input label="Start Time" name="startTime" type="datetime-local" register={register("startTime")} required/>
            <Input label="End Time" name="endTime" type="datetime-local" register={register("endTime")} required/>
            <Input label="Capacity" name="capacity" type="number" register={register("capacity")} required/>
            <lable htmlFor="description">Description</lable>
            <div>
                <textarea className="border" label="Description" name="description" row={20} {...register("description")} required/>
            </div>
            <button className="border bg-red-600 text-white">
                Upload
            </button>
        </form>
    )
}