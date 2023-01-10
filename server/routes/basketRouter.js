import Router from 'express'
import BasketController from '../controllers/basketController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const basketRouter = new Router()

basketRouter.get('/', authMiddleware, BasketController.getOne)
basketRouter.get('/count', authMiddleware, BasketController.getCountComics)
