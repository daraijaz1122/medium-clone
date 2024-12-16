import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign,verify } from 'hono/jwt';
import {app} from "../index"
export const blogRouter =new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
    },
    Variables: {
        userId:string
    }
}>();

blogRouter.use("*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    const response = await verify(header, c.env.JWT_SECRET)
    if (response) {
        //@ts-ignore
    c.set("userId",response.Id)
    await next()
  } else {
    c.status(403)
    return c.json({error:"unauthorized"}) 
  }
})
blogRouter.post('/', async (c) => {
 const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
 }).$extends(withAccelerate())
    const userId = c.get("userId")
    const body = await c.req.json();
    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId:userId
            }
        })
        return c.json({
            id: blog.id,
            message:"blog created"
        })

    } catch (e) {
        console.log(e)
        c.status(500);
        return c.json("Blog creation failed")
    }
})
blogRouter.get('/', async(c) => {
    const id = c.req.query("id")
    console.log(id)
     const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate())
    try {
        const post = await prisma.post.findUnique({
        where: {
            id
        }
    })
    return c.json(post);
    } catch (e) {
        c.status(500);
        return c.json("not found")
    }
    
})
blogRouter.put('/', async (c) => {
    const userId = c.get("userId")
    const body = await c.req.json();
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate())
  
    const updatedPost = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json('post updated')
})
blogRouter.get("/all", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
    const posts = await prisma.post.findMany()
    return c.json(posts)
})
