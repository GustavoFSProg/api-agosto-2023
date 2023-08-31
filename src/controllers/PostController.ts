import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'
import { convertBufferToString, uploader } from '../uploader'

var cloudinary = require('cloudinary')

const prisma = new PrismaClient()

async function registerPost(req: Request, res: Response) {
    try {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      })
  
      const file = convertBufferToString(req)
      if (file === undefined)
        return res.status(400).json({ error: 'Error converting buffer to string' })
  
      const { secure_url } = await uploader.upload(file)
  
      const data = await prisma.posts.create({
        data: {
          title: req.body.title,
          text: req.body.text,
          image: secure_url,
         
        },
      })
  
      return res.status(201).send({ msg: 'Success!', data })
    } catch (error) {
      return res.status(400).send({ msg: 'Error!', error })
    }

}


async function updatePost(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const file = convertBufferToString(req)
    if (file === undefined)
      return res.status(400).json({ error: 'Error converting buffer to string' })

    const { secure_url } = await uploader.upload(file)

    const data = await prisma.posts.update({
      where: {id: req.params.id},
      data: {
        title: req.body.title,
        text: req.body.text,
        image: secure_url,
       
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }

}


async function updateLikes(req: Request, res: Response) {
  try {
   
    const datas = await prisma.posts.findFirst({
      where: {id: req.params.id},
     
    })

    const lastLikes = datas.likes + 1

    const data = await prisma.posts.update({
      where: {id: req.params.id},
      data: {
        likes: lastLikes,
       
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }

}


async function updateViews(req: Request, res: Response) {
  try {
   
    const datas = await prisma.posts.findFirst({
      where: {id: req.params.id},
     
    })

    const lastViews = datas.views + 1

    const data = await prisma.posts.update({
      where: {id: req.params.id},
      data: {
        views: lastViews,
       
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }

}

async function getlAllPosts(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany()

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


async function getlOnePost(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findFirst({
      where:{id: req.params.id}
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}



export default {getlOnePost, updateLikes, updateViews, registerPost, getlAllPosts, updatePost }
