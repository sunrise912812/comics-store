import { Basket, BasketComics } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BasketController{
    async getOne(req, res){
        const {id} = req.user
        const basket = await Basket.findOne({where : {userId : id}})
        return res.json(basket)
    }
    async getCountComics(req, res){
        const {id} = req.user
        const basket = await Basket.findOne({where : {userId : id}})
        const countComics = await BasketComics.count({where : {basketId : basket.id}})
        return res.json(countComics)
    }
}

export default new BasketController()