import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signinInput, signupInput, SignupInput } from "@aijaz999/medium-common";
export const userRouter =new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>();


userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body)
  if (!success) {
    c.status(411)
    return c.json({ message: 'Invalid Inputs' })
     
    }
  try {
      const userExists = await prisma.user.findUnique({
        where: {
           email:body.email
         }
       });
  
        if ( userExists) {
          c.status(409)
          return c.json({message:"user already exists"}) 
        }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name :body.name
      }
    }) 
    const token = await sign({Id:user.id}, c.env.JWT_SECRET)
    return c.json({
      jwt:token
    })
    } catch (e) {
      c.status(411)
      return c.json({
        error:"signup failed"
      })
 }
  
  
})
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411)
    return c.json({message:"Invalid Inputs"})
  }
  try {
     const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password:body.password
    }
  })
  if (!user) {
    c.status(403)
    return c.json({message:"Wrong Credentials"})
  } else {
    const token = await sign({Id:user.id},c.env.JWT_SECRET)
    return c.json({token})
  }
   } catch (e) {
    c.status(411)
    return c.json("something went wrong , please try again")
  }
 
})
