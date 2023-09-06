import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './src/routes'

dotenv.config()

const { PORT } = process.env

const app = express()

app.use(cors(
  {
    origin: ["https://agosto-site.netlify.app", "https://my-next-agosto-app.netlify.app", "http://localhost:5173", "http://localhost:3000"]
  }
))
app.use(express.json())
app.use(routes)


app.listen(PORT, () => { console.log(` 💀 Api Running on: ${PORT}`) })

export default app
