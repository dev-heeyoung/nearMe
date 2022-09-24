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

    const onValid = (data) => {

        const getCoordinates = async () => {
            const res = await fetch(`http://api.positionstack.com/v1/forward?access_key=9ea5764760389aee5d4cbc0a8239653a&query=${data.address}`)    
            const json = await res.json();
            data.latitude = json.data[0].latitude;
            data.longitude = json.data[0].longitude;  
        };

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
        getCoordinates()
        .then(()=>{fetchData()})
        .catch(setError)
    }

    useEffect(() => {
        if (event) {
            router.push(`/events/${event.id}`)
        }
      }, [event]);
      console.log('hi')
      
    return (
        <>
        <div className="container mx-auto space-y-8">     
            <Header type="upload"/>
        </div>
        <div className="text-center max-w-screen-sm min-h-screen-2xl mx-auto mt-14 shadow-lg ">
            <h1 className="text-2xl pt-12 text-cyan-800 font-bold">Add New Event</h1>
            <form className="p-10" onSubmit={handleSubmit(onValid)}>
                <Input label="Title" name="title" type="text" register={register("title")} required/>
                <Input label="Distance (Km)" name="distance" type="number" step="0.01" register={register("distance")} required/>
                <Input label="Start Day & Time" name="startTime" type="datetime-local" register={register("startTime")} required/>
                <Input label="End Day & Time" name="endTime" type="datetime-local" register={register("endTime")} required/>
                <Input label="Capacity" name="capacity" type="number" register={register("capacity")} required/>
                <Input label="Address" name="address" type="string" placeholder={`ex) 5600 Yonge St, North York`} register={register("address")} required/>
                <div className="m-3">
                    <lable 
                        htmlFor="description"
                        >Description</lable>
                    <div>
                        <textarea className="border mt-3 w-full h-96 p-3" label="Description" name="description" row="7" {...register("description")} required/>
                    </div>
                </div>
                <button className="w-3/5 mt-10 mx-auto m-3 cursor-pointer bg-cyan-800 hover:from-stone-50 hover:to-stone-10 border-2 px-5 py-2 text-base leading-5 rounded-full font-semibold text-white hover:font-bold hover:text-bg-inherit hover:border-2 hover:border-cyan-900">
                    Upload
                </button>
            </form>
        </div>
        </>

    )
}