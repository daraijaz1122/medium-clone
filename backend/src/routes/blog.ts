import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign,verify } from 'hono/jwt';
import {app} from "../index"
import { createBlogInput, updateBlogInput } from "@aijaz999/medium-common";
export const blogRouter =new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET:string
    },
    Variables: {
        userId:string
    }
}>();
//auth middleware
blogRouter.use("*", async (c, next) => {
    const header = c.req.header("Authorization") || "";
    try {
       const response = await verify(header, c.env.JWT_SECRET)
    if (response) {
        //@ts-ignore
    c.set("userId",response.Id)
    await next()
  } else {
    c.status(403)
    return c.json({error:"unauthorized"}) 
  }
     } catch (e) {
        c.status(403)
    return c.json({error:"unauthorized"}) 
    }
   
})

//create blog
blogRouter.post('/', async (c) => {
 const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
 }).$extends(withAccelerate())
    const userId = c.get("userId")
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({message:"Invalid inputs"})
    }
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

//get single blog
blogRouter.get('/', async(c) => {
    const id = c.req.query("id")
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

//update blog
blogRouter.put('/', async (c) => {
    const userId = c.get("userId")
    const body = await c.req.json();
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
     }).$extends(withAccelerate())
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({message:"Invalid Inputs"})
    }
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

//get all blogs
blogRouter.get("/all", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
    const posts = await prisma.post.findMany()
    return c.json(posts)
})

//changed_to_production_jwt_secret
