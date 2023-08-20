import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'


const prisma: any = new PrismaClient()


async function createCategory(req: Request, res: Response){
     try {
      const categoryas =  await prisma.categs.create({
        data:{
          name: req.body.name
        }
      })
      return res.status(201).json({msg: "Categoria Criado com sucesso!", categoryas})
     } catch (error) {
      return res.status(400).json({msg: "ERROR!", error})
      
     }
  
}


async function getCategory(req: Request, res: Response){
  try {
   const categorys =  await prisma.categs.findMany()

   return res.status(201).json({categorys})


  } catch (error) {
   
  }

}

export default {createCategory, getCategory}