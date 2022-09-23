import { useForm } from "react-hook-form";
import { useState } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react";

import Header from "../../components/Header"
import Input from "../../components/Input"

export default function Upload() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [ event, setEvent ] = useState(undefined);
    const [ error, setError ] = useState(undefined);
    const router = useRouter();
    const { redirect } = router.query;

    const onValid = (data) => {
        const fetchData = async () => {
            const res = await fetch("/api/event", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const json = await res.json();
            console.log(json.event);
            setEvent(json.event);
        }
        fetchData()
        .catch(setError)
    }

    useEffect(() => {
        if (event) {
            router.push(`/events/${event.id}`)
        }
      }, [event]);
      
    return (
        <>        
        <Header type="upload"/>
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
        </>

    )
}