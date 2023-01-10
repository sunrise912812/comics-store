import { BasketComics, Comics } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BasketComicsController{
    async create(req, res){
        const {comicId, countComics, basketId} = req.body
        const basketComics = await BasketComics.create({countComics, basketId, comicId})
        const getCountComics = await BasketComics.count({where : {basketId}})
        return res.json(getCountComics)

    }
    async getAll(req, res, next){
        let {basketId} = req.query
        if (basketId){
            const basketComics = await BasketComics.findAndCountAll({where : {basketId}, include : [{ model : Comics}]})
            return res.json(basketComics)
        }
        else{
            return next(ApiError.badRequest('Непредвиденная ошибка...'))
        }
        
    }
    async delete(req, res){
        const {id} = req.params
        const basketComics = await BasketComics.findOne({where : {id}})
        await BasketComics.destroy({where : {id}})
        const getCountComics = await BasketComics.count({where : {basketId : basketComics.basketId}})
        return res.json(getCountComics)
    }
    async update(req, res){
        const {id} = req.params
        const {countComics} = req.body
        console.log(countComics)
        await BasketComics.update({countComics}, {where : {id}})
        const basketComics = await BasketComics.findOne({where : {id}})
        return res.json(basketComics)
    }
}

export default new BasketComicsController()