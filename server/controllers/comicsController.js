import { Comics, ComicsInfo, ComicsComment, Raiting, User } from '../models/models.js'
import ApiError from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'
import { Op } from 'sequelize'

const __dirname = path.resolve()

class ComicsController{
    async create(req, res, next){
        try{
            let {name, description, price, categoryId, brandId, info} = req.body
            const {img} = req.files
            let filename = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'server/static', filename))
            const comic = await Comics.create({name, description, price, categoryId, brandId, img : filename})
            if(info){
                info = JSON.parse(info)
                info.forEach((i)=>{
                    ComicsInfo.create({title : i.title, description : i.description, comicId : comic.id})
                })
            }
            return res.json(comic)
            
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req, res){
        let {brandId, categoryId, limit, page, sort, query} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let comics
        let orders = []
        let search = ''
        if(query){
            if(query.query){
                search = query.query
            }
        }
        if(sort){
            orders = sort.sort.split('_')
            if(orders.length === 1){
                if(orders[0]){
                    orders =  [[orders[0]],]
                }
                else{
                    orders = null
                }
            }
            else if(orders.length === 2){
                orders =  [[orders[0],orders[1]],]
            }
        }
        if(!brandId && !categoryId){
            if(orders){
                if(search){
                    comics = await Comics.findAndCountAll({where : {name : { [Op.like]: `%${search}%` }}, order : orders, limit, offset})
                }else{
                    comics = await Comics.findAndCountAll({order : orders, limit, offset})
                } 
            }else{
                if(search){
                    comics = await Comics.findAndCountAll({where : {name : { [Op.like]: `%${search}%` }}, limit, offset})
                }
                else{
                    comics = await Comics.findAndCountAll({limit, offset})
                }
                
            }   
        }
        if(brandId && !categoryId){
            if(orders){
                if(search){
                    comics = await Comics.findAndCountAll({where : {brandId, name : { [Op.like]: `%${search}%` }}, order : orders, limit, offset})
                }else{
                    comics = await Comics.findAndCountAll({where : {brandId}, order : orders, limit, offset})
                }  
            }
            else{
                if(search){
                    comics = await Comics.findAndCountAll({where : {brandId, name : { [Op.like]: `%${search}%` }}, limit, offset})
                }else{
                    comics = await Comics.findAndCountAll({where : {brandId}, limit, offset})
                }
                
            }   
        }
        if(!brandId && categoryId){
            if(orders){
                if(search){
                    comics = await Comics.findAndCountAll({where : {categoryId, name : { [Op.like]: `%${search}%` }}, order : orders, limit, offset})
                }
                else{
                    comics = await Comics.findAndCountAll({where : {categoryId}, order : orders, limit, offset})
                }
                
            }
            else{
                if(search){
                    comics = await Comics.findAndCountAll({where : {categoryId, name : { [Op.like]: `%${search}%` }}, limit, offset})
                }else{
                    comics = await Comics.findAndCountAll({where : {categoryId}, limit, offset})
                }
                
            }
        }
        if(brandId && categoryId){
            if(orders){
                if(search){
                    comics = await Comics.findAndCountAll({where : {brandId, categoryId, name : { [Op.like]: `%${search}%` }}, order : orders, limit, offset})
                }
                else{
                    comics = await Comics.findAndCountAll({where : {brandId, categoryId}, order : orders, limit, offset})
                }
                
            }
            else{
                if(search){
                    comics = await Comics.findAndCountAll({where : {brandId, categoryId, name : { [Op.like]: `%${search}%` }}, limit, offset})
                }else{
                    comics = await Comics.findAndCountAll({where : {brandId, categoryId}, limit, offset})
                }
                
            } 
        }
        return res.json(comics)
    }
    async getOne(req, res){
        const {id} = req.params
        const comic = await Comics.findOne({where : {id}, include : [{model : ComicsInfo, as : 'info'}, {model : ComicsComment, as : 'comment', include : [{model : Raiting}, {model : User}]}]})
        return res.json(comic)
    }
    async getTop(req, res){
        let {limit} = req.query
        limit = limit || 5
        const comics = await Comics.findAll({limit, order : [['raiting','DESC'],]})
        return res.json(comics)
    }
    async delete(req, res, next){
        const {id} = req.params
        const comic = await Comics.findOne({where : {id}})
        if(comic){
            const filePath = path.resolve(__dirname, '..', 'server/static', comic.img)
            fs.unlinkSync(filePath)
            await ComicsInfo.destroy({where : {comicId : comic.id}})
            await Comics.destroy({where : {id}})
            return res.json({message : 'Комикс удалён...'}) 
        }
        else{
            return next(ApiError.badRequest('Ошибка при удалении...')) 
        }   
    }
    async update(req, res){
        const {id} = req.params
        let {name, description, price, categoryId, brandId, info} = req.body
        const comic = await Comics.findOne({where : {id}})
        if(comic){
            await ComicsInfo.destroy({where : {comicId : comic.id}})
            let filename
            if (req.files){
                const {img} = req.files
                if(img){
                    const filePath = path.resolve(__dirname, '..', 'server/static', comic.img)
                    fs.unlinkSync(filePath)
                    filename = uuidv4() + '.jpg'
                    img.mv(path.resolve(__dirname, '..', 'server/static', filename))
                }
                else{
                    filename = comic.img
                }
            }
            else{
                filename = comic.img
            }
            await Comics.update({name, description, price, categoryId, brandId, img : filename}, {where : {id}})
            const comicNew = Comics.findOne({where : {id}})
            if(info){
                info = JSON.parse(info)
                info.forEach((i)=>{
                    ComicsInfo.create({title : i.title, description : i.description, comicId : comic.id})
                })
            }
            return res.json(comicNew)
        }
    }

}

export default new ComicsController()