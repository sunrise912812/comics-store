import Router from 'express'
import OrderComicsController from '../controllers/orderComicsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const orderComicsRouter = new Router()

orderComicsRouter.post('/', authMiddleware, OrderComicsController.create)
orderComicsRouter.get('/:id', authMiddleware, OrderComicsController.getAll) 