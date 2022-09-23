import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import Event from '../../components/Event'
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


export default function EventDetail({event}) {
  console.log(event)
    // const [event, setEvent] = useState(undefined)
    // const [isLoading, setLoading] = useState(false)

    // const router = useRouter();
    // const {
    //   isReady,
    //   query: {
    //     id,
    //   }
    // } = router;
    // console.log(isReady)

    // useEffect(() => {
    //   if (!isReady) {
    //     console.log('Router not ready')
    //     return;
    //   }
    //     console.log(id);
    //     setLoading(true);

    //     const fetchData = async () => {
    //       const data = await fetch(`/api/events/${id}`)
    //       const json = await data.json();
    //       setEvent(json.event);
    //   }
    //   fetchData()
    //   .catch()
    // }, [id, isReady, event])
    // console.log(event)
    return (
        <div className="w-1/2">
             hi
        </div>
    )
}


export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id)
  const event = await client.event.findUnique({
    where: {
      id: +id
    },
    select: {
      title: true,
      description: true,
    },
  })
  console.log(event.title)
  return {
    props: {
      event: JSON.parse(JSON.stringify(event))
    }
  }
}