import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient()

export default async function handler(req, res) {

    const session = await getSession({ req });
    const { user } = session;
    if (req.method === 'GET') {
        const events = await prisma.$queryRaw`SELECT * FROM Event WHERE hostId=${user.id}`    
        res.status(200).json({ events })
    }
}