import Router from 'express'
import BrandController from "../controllers/brandController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const brandRouter = new Router()

brandRouter.post('/', checkRoleMiddleware('ADMIN'), BrandController.create)
brandRouter.get('/', BrandController.getAll)
brandRouter.delete('/:id', checkRoleMiddleware('ADMIN'), BrandController.delete)
brandRouter.put('/:id', checkRoleMiddleware('ADMIN'), BrandController.update)