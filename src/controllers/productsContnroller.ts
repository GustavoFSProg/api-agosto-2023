import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { convertBufferToString, uploader } from '../uploader'

var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

const prisma = new PrismaClient()

async function RegsiterProduct(req: Request, res: Response) {
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

    const data = await prisma.products.create({
      data: {
        name: req.body.name,
        image: secure_url,
        price: Number(req.body.price),
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}


async function UpdateProduct(req: Request, res: Response) {
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

    const data = await prisma.products.update({
      where: {id: req.params.id},
      data: {
        name: req.body.name,
        image: secure_url,
        price: Number(req.body.price),
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function getlAllProducts(req: Request, res: Response) {
  try {
    const data = await prisma.products.findMany({
      orderBy: {createdAt: 'desc'}
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


async function getlOneProducts(req: Request, res: Response) {
  try {
    const data = await prisma.products.findFirst({
      where: {id: req.params.id},
      orderBy: {createdAt: 'desc'}
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function getProduct(req: Request, res: Response) {
  try {
    const data = await prisma.products.findFirst({
      where:{id: req.params.id}
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

export default { RegsiterProduct, getlOneProducts, UpdateProduct, getProduct, getlAllProducts }
