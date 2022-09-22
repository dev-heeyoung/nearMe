import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
   
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

export default async function handler(req, res) {
    const session = await getSession({ req });
    const { user } = session;
    console.log(user);
    if (!session) {
      return res.status(401).send({ message: 'signin required' });
    }
    if (req.method === 'POST') {
      const {
        body: { title, distance, startTime, endTime, capacity, description, latitude, longitude },
      } = req;
      
      const event = await prisma.event.create({
        data: {
            title,
            distance: Number(distance),
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            capacity: Number(capacity),
            description,
            latitude: 1.1,
            longitude: 1.1,
            // latitude: parseFloat(event.lat),
            // longitude:  parseFloat(event.long),
            availability: true,  
            host: {
              connect: {
                id: user?.id,
              }
            }    
          },        
      });
      res.json({
        ok: true,
        event,
      });
    } 

    else if(req.method=='GET'){
      const lat = parseFloat(req.query.lat)
      const long = parseFloat(req.query.long)
      const result = await prisma.$queryRaw`SELECT * FROM Event`

      const filtered = result.filter(event=>{
        return getDistanceFromLatLonInKm(event.latitude,event.longitude,lat,long) < parseFloat(event.distance)
      })

      res.status(200).json(filtered) 
    }
  }