import React from 'react'
import { observer } from 'mobx-react-lite'
import classes from './OrderComicsListOne.module.css'

const OrderComicsListOne = observer(({order_comics})=>{
    return(
        <div>
            <div className={classes.MyOrderComicsListOne}>
            <div className={classes.MyOrderComicsListHeaderOne}>
                <div>Товары</div>
                <div>Цена</div>
                <div>Количество</div>
                <div>Сумма</div>
            </div>
            {
                order_comics.map((c)=>{
                    return(
                        <div key={c.id} className={classes.MyOrderComicsListContentOne}>
                            <div className={classes.MyOrderComicsListContentMainOne}><div className={classes.MyOrderComicsListContentImgOne} style={{backgroundImage : `url(${process.env.REACT_APP_API_URL + c.comic.img})`}}></div><h5>{c.comic.name}</h5></div>
                            <div className={classes.MyOrderComicsListContentPriceOne}>{c.comic.price} т</div>
                            <div className={classes.MyOrderComicsListContentCountOne}>{c.countComics} шт</div>
                            <div className={classes.MyOrderComicsListContentSummOne}>{c.comic.price * c.countComics} т</div>
                        </div>
                    )
                })
            }
            </div>
            <div className={classes.MyOrderComicsListBotomOne}>
                <div>Общая сумма: {order_comics.reduce((total, c)=> total + (c.comic.price * c.countComics), 0)} т</div>
            </div>
        </div>
    )
})

export default OrderComicsListOne