import React, {useContext, useState} from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Form, Button } from 'react-bootstrap'
import classes from '../../../pages/styles/ComicOnePage.module.css'
import { Context } from '../../../index'
import { addComicsInBasket } from '../../../http/basketAPI'

const CardBasket = observer(({comic})=>{
    const {user, basket} = useContext(Context)
    const [countBasketComic, setCountBasketComic] = useState(1)
    function funcAddComicInBasket(id){
        addComicsInBasket({comicId : id, countComics : countBasketComic, basketId : basket.basket.id}).then(data=>{
            basket.setCountBasketComics(data)
            setCountBasketComic(1)
        })
      }
    return(
            <Card className={classes.ComicOnePageRight}>
                <h5>В корзину</h5>
                <div className={classes.ComicOneRightPrice}>Цена: <span>{comic.price} т</span></div>
                <div className={classes.ComicOneRightCount}>Количество: 
                    <Form>
                        <Form.Control value={countBasketComic} onChange={e=>setCountBasketComic(e.target.value)} type="number" min={1}></Form.Control>
                    </Form>
                </div>
                <Button onClick={()=>funcAddComicInBasket(comic.id)} variant="warning" className={classes.ComicOnePageRightBtn} disabled={!user.isAuth ? true : false}>Добавить в корзину</Button>
            </Card>
    )
})

export default CardBasket