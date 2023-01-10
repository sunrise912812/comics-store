import { Raiting, Comics, ComicsComment } from "../models/models.js";
import { Sequelize } from 'sequelize'
import { sequelize_db } from "../db.js";

class RaitingController{
    async create(req, res){
        const {rate, userId, comicId, text} = req.body
        const comment = await ComicsComment.create({text, comicId, userId})
        const raiting = await Raiting.create({rate, comicsCommentId : comment.id})
        const [results, metadata] = await sequelize_db.query(`SELECT sum(r.rate)::NUMERIC/count(r.rate) as raiting FROM raitings r
        inner join comics_comments cc on cc.id = r."comicsCommentId"
        where cc."comicId" = ${comicId}`)
        await Comics.update({raiting : results[0].raiting}, {where : {id : comicId}})
        return res.json({...comment, rate : raiting.rate})
    }
}

export default new RaitingController()