import Router from 'express'
import BanerImgController from '../controllers/BanerImgController.js'
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const banerImgRouter = new Router()

banerImgRouter.post('/', checkRoleMiddleware('ADMIN'), BanerImgController.create)
banerImgRouter.get('/', BanerImgController.getAll)
banerImgRouter.delete('/:id', checkRoleMiddleware('ADMIN'), BanerImgController.delete)