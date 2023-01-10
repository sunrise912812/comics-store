import { BanerImg } from "../models/models.js";
import ApiError from "../error/ApiError.js";
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'

const __dirname = path.resolve()

class BanerImgController{
    async create(req, res, next){
        try{
            const {img} = req.files
            const {link, description} = req.body
            let filename = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'server/static', filename))
            const banerImg = await BanerImg.create({link, description, img : filename})
            return res.json(banerImg)
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }     
    }

    async delete(req, res, next){
        const {id} = req.params
        const banerImg = await BanerImg.findOne({where : {id}})
        if(banerImg){
            const filePath = path.resolve(__dirname, '..', 'server/static', banerImg.img)
            fs.unlinkSync(filePath)
            await BanerImg.destroy({where : {id}})
            return res.json({message:'Картинка с банера удалена...'})
        }else{
            return next(ApiError.badRequest('Картинка с банера не была удалена...'))
        }
    }

    async getAll(req, res){
        const banerImgs = await BanerImg.findAll()
        return res.json(banerImgs)
    }

}

export default new BanerImgController()