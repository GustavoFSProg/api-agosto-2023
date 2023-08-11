import {Request, Response, Router} from 'express'
// import UserController from './controllers/UserController'/
import productsContnroller from './controllers/productsContnroller'
import { multerConfig } from './uploader'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  return res.status(200).send({message: ` 💀 Api Running`})
})
// routes.get('/get-all-users', UserController.getlAllUsers)
// routes.post('/register-user', UserController.registerUser)
// routes.post('/login', UserController.Login)
// routes.delete('/delete-all-users', UserController.deletAllusers)

routes.post('/register-product', multerConfig, productsContnroller.RegsiterProduct)
routes.put('/update-product/:id', multerConfig, productsContnroller.UpdateProduct)
routes.get('/get-all-products', productsContnroller.getlAllProducts)
routes.get('/get-product/:id', productsContnroller.getProduct)
routes.delete('/delete-products', productsContnroller.deleteProducts)


export default routes

