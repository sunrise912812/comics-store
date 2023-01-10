import { Brand } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class BrandController{
    async create(req, res){
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res){
        const {id} = req.params
        await Brand.destroy({where : {id}})
        return res.json({message : 'Издательство удалено...'})
    }

    async update(req, res){
        const {name} = req.body
        const {id} = req.params
        await Brand.update({name}, {where : {id}})
        const brand = await Brand.findOne({where : {id}})
        return res.json(brand)
    }
}

export default new BrandController()