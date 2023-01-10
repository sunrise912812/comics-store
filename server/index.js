import express from 'express'
import { config } from 'dotenv'
import { sequelize_db } from './db.js'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import { ErrorMiddleware } from './middleware/ErrorHandlerMiddleware.js'
import mainRouter from './routes/index.js'
import { User, Basket, Comics, Category, Brand, Raiting, ComicsInfo, CategoryBrand, Order, OrderInfo, BanerImg, OrderComics, BasketComics, ComicsComment } from './models/models.js'

config()

const __dirname = path.resolve()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', mainRouter)
app.use(ErrorMiddleware)

const start = async () =>{
    try{
        await sequelize_db.authenticate()
        await sequelize_db.sync()
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start()

