import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import classes from '../../../pages/styles/ComicOnePage.module.css'
import { Card } from 'react-bootstrap'
import cardStar from '../../../assets/star.png'

const CardReviews = observer(({comment})=>{
    const {user} = useContext(Context)
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    return(
        <div className={classes.MyCardReviews}>
            <h5>Отзывы</h5>
            <div>
                {
                    comment.map((c)=>{
                        return(
                            <Card key={c.id} className={classes.CardReviewsItem}>
                                <div className={classes.CardReviewsItemDate}>Дата отзыва: {getMyDateCard(c.dateCreate)}</div>
                                <div className={classes.CardReviewsItemUser}>Пользователь: <span>{c.user.email}</span></div>
                                <div className={classes.CardReviewsItemRaiting}>Оценка: <img src={cardStar} alt={cardStar}/> <span>{c.raiting.rate}</span></div>
                                <div className={classes.CardReviewsItemText}>{c.text}</div>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
})

export default CardReviews