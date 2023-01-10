import Router from 'express'
import OrderController from '../controllers/orderController.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const orderRouter = new Router()

orderRouter.post('/', authMiddleware, OrderController.create)
orderRouter.get('/', authMiddleware, OrderController.getAll)
orderRouter.get('/alladmin', checkRoleMiddleware('ADMIN'), OrderController.getAllAdmin)
orderRouter.get('/:id', authMiddleware, OrderController.getOne)
orderRouter.delete('/:id', checkRoleMiddleware('ADMIN'), OrderController.delete)
orderRouter.post('/:id', authMiddleware, OrderController.addInfo)