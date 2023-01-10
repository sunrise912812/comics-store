import ApiError from "../error/ApiError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { User, Basket } from '../models/models.js';
import { config } from 'dotenv';
config()

const generateJWT = (userId, email, role)=>{
    return jwt.sign({
        id : userId, email, role
    },
    process.env.SECRET_KEY,
    {
        expiresIn : '24h'
    })
}

class UserController{
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Некоректный email или пароль...'))
        }
        const candidate = await User.findOne({where : {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует...'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role : role ? role : 'USER', password : hashPassword})
        const basket = await Basket.create({userId : user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where : {email}})
        if(!user){
            return next(ApiError.forbidden('Пользователь не найден...'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.forbidden('Пароль указан не верно...'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res){
        const {id, email, role} = req.user
        const token = generateJWT(id, email, role)
        return res.json({token})
    }
}

export default new UserController()