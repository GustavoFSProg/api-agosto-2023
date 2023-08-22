import {Request, Response, Router} from 'express'
import productsContnroller from './controllers/productsContnroller'
import { multerConfig } from './uploader'
import UserController from './controllers/UserController'
import categoryController from './controllers/categoryController'
import PostController from './controllers/PostController'
import { isAuthorized } from './controllers/autorize'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.status(200).send({message: ` 💀 Api Running`})
})

// users
routes.get('/get-all-users', isAuthorized, UserController.getlAllUsers)
routes.post('/register-user', UserController.registerUser)
routes.post('/login', UserController.Login)
routes.delete('/delete-all-users', UserController.deletAllusers)

// products
routes.post('/register-product', isAuthorized, multerConfig, productsContnroller.RegsiterProduct)
routes.put('/update-product/:id', multerConfig, productsContnroller.UpdateProduct)
routes.get('/get-all-products', productsContnroller.getlAllProducts)
routes.get('/get-product/:id', productsContnroller.getProduct)
routes.delete('/delete-products', productsContnroller.deleteProducts)

// posts
routes.post('/register-post', multerConfig, PostController.registerPost)
routes.get('/get-all-posts', PostController.getlAllPosts)
routes.put('/update-post/:id', multerConfig, PostController.updatePost)
routes.put('/likes/:id', PostController.updateLikes)
routes.put('/views/:id', PostController.updateViews)


routes.get('/get-all-categorys', categoryController.getCategory)
routes.post('/register-category', categoryController.createCategory)

export default routes

