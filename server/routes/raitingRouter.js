import Router from 'express'
import RaitingController from '../controllers/raitingController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const raitingRouter = new Router()

raitingRouter.post('/', authMiddleware, RaitingController.create)