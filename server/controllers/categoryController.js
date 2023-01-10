import { Category } from "../models/models.js";
import ApiError from "../error/ApiError.js";

class CategoryController{
    async create(req, res){
        const {name} = req.body
        const category = await Category.create({name})
        return res.json(category)
    }

    async getAll(req, res){
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async delete(req, res){
        const {id} = req.params
        await Category.destroy({where : {id}})
        return res.json({message : 'Категория удалена...'})
    }

    async update(req, res){
        const {id} = req.params
        const {name} = req.body
        await Category.update({name}, {where : {id}})
        const category = Category.findOne({where : {id}})
        return res.json(category)
    }
}

export default new CategoryController()