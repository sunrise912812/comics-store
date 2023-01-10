import Router from 'express'
import BasketComicsController from "../controllers/basketComicsController.js";
import { authMiddleware } from '../middleware/authMiddleware.js'

export const basketComicsRouter = new Router()

basketComicsRouter.post('/', authMiddleware, BasketComicsController.create)
basketComicsRouter.get('/', authMiddleware, BasketComicsController.getAll)
basketComicsRouter.delete('/:id', authMiddleware, BasketComicsController.delete)
basketComicsRouter.put('/:id', authMiddleware, BasketComicsController.update)

