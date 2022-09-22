import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()



export default async function handler(req, res) {

    const session = await getSession({ req });
    const { user } = session;
    if (req.method == 'GET') {
        const result = await prisma.$queryRaw`SELECT * FROM Event WHERE hostId=${user.id}`
        console.log(result);        
        res.status(200).json({ "events": result })
    }
}