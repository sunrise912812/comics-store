import Router from 'express'
import ComicsController from '../controllers/comicsController.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'

export const comicsRouter = new Router()

comicsRouter.post('/', checkRoleMiddleware('ADMIN'), ComicsController.create)
comicsRouter.get('/', ComicsController.getAll)
comicsRouter.get('/top', ComicsController.getTop)
comicsRouter.get('/:id', ComicsController.getOne)
comicsRouter.delete('/:id', checkRoleMiddleware('ADMIN'), ComicsController.delete)
comicsRouter.put('/:id', checkRoleMiddleware('ADMIN'), ComicsController.update)