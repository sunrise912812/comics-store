import Router from 'express'
import { brandRouter } from './brandRouter.js'
import { categoryRouter } from './categoryRouter.js'
import { userRouter } from './userRouter.js'
import { comicsRouter } from './comicsRouter.js'
import { basketComicsRouter } from './basketComicsRouter.js'
import { raitingRouter } from './raitingRouter.js'
import { basketRouter } from './basketRouter.js'
import { orderRouter } from './orderRouter.js'
import { orderComicsRouter } from './orderComicsRouter.js'
import { banerImgRouter } from './banerImgRouter.js'

const mainRouter = new Router()

mainRouter.use('/brand', brandRouter)
mainRouter.use('/category', categoryRouter)
mainRouter.use('/user', userRouter)
mainRouter.use('/comics', comicsRouter)
mainRouter.use('/basketcomics', basketComicsRouter)
mainRouter.use('/raiting', raitingRouter)
mainRouter.use('/basket', basketRouter)
mainRouter.use('/order', orderRouter)
mainRouter.use('/ordercomics', orderComicsRouter)
mainRouter.use('/banerimg', banerImgRouter)

export default mainRouter