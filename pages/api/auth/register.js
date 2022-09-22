import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs';

const client = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
      }
      const { firstName, lastName, email, password } = req.body;
      if (
        !firstName ||
        !lastName ||
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 5
      ) {
        console.log(req.body)
        res.status(422).json({
          message: 'Validation error',
        });
        return;
      }
    
      const existingUser = await client.host.findFirst({ 
        where: { email } 
      });
      if (existingUser) {
        res.status(422).json({ message: 'User exists already!' });
        return;
      }
    
      const newUser = await client.host.create({
        data: {
          firstName,
          lastName,
          email,
          password: bcryptjs.hashSync(password),
        }
      });
    
      res.status(201).send({
        message: 'Created user!',
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
}
