import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import md5 from 'md5'
import { generateToken } from '../token'

const prisma = new PrismaClient()

async function registerUser(req: Request, res: Response) {
  try {
    const userEmail = await prisma.user.findFirst({
      where: { email: req.body.email },
    })

    if (userEmail) return res.status(400).send({ msg: 'Email ja cadastrado!!' })

    const users = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
      },
    })

    return res.status(201).send({ msg: 'Usuario Cadastrado', users })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function getlAllUsers(req: Request, res: Response) {
  try {
    const data = await prisma.user.findMany()

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}


async function deletAllusers(req: Request, res: Response) {
  try {
    await prisma.user.deleteMany()

    return res.status(201).send({ msg: 'User Deletado!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function Login(req: Request, res: Response) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
      },
    })

    if (!user) return res.status(400).send({ msg: 'Email ou Senha incorretos!!' })

    const token = await generateToken(user)
    return res.status(201).send({ msg: 'Login efetuado com sucesso!!', user, token })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

export default { getlAllUsers, Login, deletAllusers, registerUser }
