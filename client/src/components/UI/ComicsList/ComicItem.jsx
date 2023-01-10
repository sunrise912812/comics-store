import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import cardStar from '../../../assets/star.png'
import { COMIC_ROUTE } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'
import classes from './ComicsList.module.css'
import { Context } from '../../../index'

const ComicItem = observer(({comic, addBasketComic})=>{
    const {user} = useContext(Context)
    return(
        <div className={classes.ComicListItem}>
        <div className={classes.ComicListItemContent}>
            <div style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + comic.img})` }} className={classes.ComicListItemMainImg}></div>
            <h5>{comic.name}</h5>
            <p><span>Рейтинг:</span><img src={cardStar} alt={cardStar} className={classes.ComicListItemRaitingImg}/>{comic.raiting}</p>
            <NavLink to={COMIC_ROUTE + '/' + comic.id}>Подробнее...</NavLink>
            <h6>{comic.price} т</h6>
        </div>
        {
            user.isAuth && <div className={classes.ComicListItemBasket} onClick={()=>addBasketComic(comic)}>В корзину</div>
        }
    </div>
    )
})

export default ComicItem