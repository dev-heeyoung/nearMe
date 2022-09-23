import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  const id = req.query.id;
    if (req.method === 'GET'){
      const event = await prisma.event.findUnique({
        where: {
          id: +id
        },
      })
      console.log(event)
      res.status(200).json(event)
    }
    
    if (req.method === 'DELETE') {      
      await prisma.event.delete({
        where: {
            id: +id,
          },
        })
    } 

}