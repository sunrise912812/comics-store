import Router from 'express'
import UserController from '../controllers/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const userRouter = new Router()

userRouter.post('/registration', UserController.registration)
userRouter.post('/login', UserController.login)
userRouter.get('/auth', authMiddleware, UserController.check)