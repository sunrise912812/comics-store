import { Order, OrderInfo, OrderComics, Comics } from '../models/models.js'
import ApiError from '../error/ApiError.js'
import { Op } from 'sequelize'

class OrderController{
    async create(req, res, next){
        try{
            const {id} = req.user
            let {info} = req.body
            const order = await Order.create({userId : id, status : 1})
            if(info){
                info = JSON.parse(info)
                info.forEach(i=>{
                    console.log(i)
                    OrderInfo.create({
                        title : i.title,
                        description : i.description,
                        orderId : order.id
                    })
                })
            }
            return res.json(order)
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }    
    }

    async getAll(req, res){
        let {limit, page} = req.query
        const {id} = req.user
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        const orders = await Order.findAll({where : {userId : id}, limit, offset, include : [{model : OrderComics, include : [{model : Comics}]}], order : [['dateOrder','DESC'],]})
        const countItem = await Order.count({where : {userId : id}})
        return res.json({count : countItem, rows : orders})

    }

    async getAllAdmin(req, res){
        let {limit, page, query} = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let search = ''
        let orders
        let countItem
        if(query){
            if(query.query){
                search = query.query
            }
        }
        if(search){
            orders = await Order.findAll({where : {id : search}, limit, offset, include : [{model : OrderComics, include : [{model : Comics}]}], order : [['dateOrder','DESC'],]})
            countItem = await Order.count({where : {id : search}})
        }
        else{
            orders = await Order.findAll({limit, offset, include : [{model : OrderComics, include : [{model : Comics}]}], order : [['dateOrder','DESC'],]})
            countItem = await Order.count()
        }
        return res.json({count : countItem, rows : orders})

    }

    async getOne(req, res){
        const {id} = req.params
        const order = await Order.findOne({where : {id}, include : [{model : OrderInfo, as : 'info'}, {model : OrderComics, include : [{model : Comics}]}]})
        return res.json(order)
    }

    async delete(req, res, next){
        const {id} = req.params
        const order = await Order.findOne({where : {id}})
        if(order){
            await OrderInfo.destroy({where : {orderId : order.id}})
            await OrderComics.destroy({where : {orderId : order.id}})
            await Order.destroy({where : {id : order.id}})
            return res.json({message : 'Заказ удалён...'})
        }
        else{
            return next(ApiError.badRequest('Ошибка при удалении...')) 
        }
    }
    async addInfo(req, res, next){
        const {id} = req.params
        let {info} = req.body
        if(info){
            info = JSON.parse(info.toString())
            for(let i of info){
                OrderInfo.create({
                    title : i.title,
                    description : i.description,
                    orderId : id
                })
                if(i.title === "Статус"){
                    let idStatus = 0
                    if(i.description === 'Оформлен'){
                        idStatus = 1
                    }
                    else if (i.description === 'Отменен'){
                        idStatus = 2
                    }
                    else if (i.description === 'Выполнен'){
                        idStatus = 3
                    }
                    Order.update({status : idStatus},{where : {id}})
                }
            }
            return res.json(info)
        }
        else{
            return next(ApiError.badRequest('Ошибка при добавлении информации о заказе...')) 
        }   
    }
}

export default new OrderController()