import Router  from "express";
import CategoryController from "../controllers/categoryController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

export const categoryRouter = new Router()

categoryRouter.post('/', checkRoleMiddleware('ADMIN'), CategoryController.create)
categoryRouter.get('/', CategoryController.getAll)
categoryRouter.delete('/:id', checkRoleMiddleware('ADMIN'), CategoryController.delete)
categoryRouter.put('/:id', checkRoleMiddleware('ADMIN'), CategoryController.update)