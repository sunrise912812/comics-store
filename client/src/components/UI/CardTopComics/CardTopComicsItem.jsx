import React, {useContext} from 'react'
import classes from './CardTopComics.module.css'
import cardStar from '../../../assets/star.png'
import { COMIC_ROUTE } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite'

const CardTopComicsItem = observer(({comic, addBasketComic})=>{
    const {user} = useContext(Context)
    return(
    <div className={classes.topItem}>
        <div className={classes.topItemContent}>
            <div style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + comic.img})` }} className={classes.topItemMainImg}></div>
            <h5>{comic.name}</h5>
            <p><span>Рейтинг:</span><img src={cardStar} alt={cardStar} className={classes.topItemRaitingImg}/>{comic.raiting}</p>
            <NavLink to={COMIC_ROUTE + '/' + comic.id}>Подробнее...</NavLink>
            <h6>{comic.price} т</h6>
        </div>
        {
            user.isAuth && <div className={classes.topItemBasket} onClick={()=>addBasketComic(comic)}>В корзину</div>
        }
    </div>
    )
})

export default CardTopComicsItem