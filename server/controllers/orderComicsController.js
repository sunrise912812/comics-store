import { OrderComics } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class OrderComicsController{
    async create(req, res){
        const {orderId, comicId, countComics} = req.body
        const orderComics = await OrderComics.create({orderId, comicId, countComics})
        res.json(orderComics)
    }

    async getAll(req, res, next){
        const {id} = req.params
        if(id){
            const orderComics = await OrderComics.findAll({where : {orderId : id}})
            res.json(orderComics)
        }
        else{
            return next(ApiError.badRequest('Не удалось получить список комиксов из заказа...'))
        }   
    }
}

export default new OrderComicsController()