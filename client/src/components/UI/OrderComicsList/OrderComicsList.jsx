import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import classes from '../../../pages/styles/OrderComicsList.module.css'

const OrderComicsList = observer(()=>{
    const {order} = useContext(Context)
    return(
        <div>
            <div className={classes.MyOrderComicsList}>
            <div className={classes.MyOrderComicsListHeader}>
                <div>Товары</div>
                <div>Цена</div>
                <div>Количество</div>
                <div>Сумма</div>
            </div>
            {
                order.selectedOrderComics.map((c)=>{
                    return(
                        <div key={c.id} className={classes.MyOrderComicsListContent}>
                            <div className={classes.MyOrderComicsListContentMain}><div className={classes.MyOrderComicsListContentImg} style={{backgroundImage : `url(${process.env.REACT_APP_API_URL + c.comic.img})`}}></div><h5>{c.comic.name}</h5></div>
                            <div className={classes.MyOrderComicsListContentPrice}>{c.comic.price} т</div>
                            <div className={classes.MyOrderComicsListContentCount}>{c.countComics} шт</div>
                            <div className={classes.MyOrderComicsListContentSumm}>{c.comic.price * c.countComics} т</div>
                        </div>
                    )
                })
            }
            </div>
            <div className={classes.MyOrderComicsListBotom}>
                <div>Общая сумма: {order.selectedOrderComics.reduce((total, c)=> total + (c.comic.price * c.countComics), 0)} т</div>
            </div>
        </div>
    )
})

export default OrderComicsList