import React from 'react'
import { observer } from 'mobx-react-lite'
import classes from '../../../pages/styles/BasketPage.module.css'
import { Form, Button } from 'react-bootstrap'

const CardBasketContentItem = observer(({comic, updateChecked, deleteRow, updateCount})=>{
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    return(
        <div className="MyBasketPageLeftContent">
        <div>
            <Form>
                <Form.Check type="checkbox" checked={comic.checked || false} onChange={(e)=>updateChecked(comic.id, e.target.checked)} />
            </Form>
        </div>
        <div className={classes.MyBasketPageLeftContentMain}><div className={classes.MyBasketPageLeftContentImg} style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + comic.comic.img})` }}></div><div className={classes.MyBasketPageLeftContentInfo}><h5>{comic.comic.name}</h5>
        <div className={classes.MyBasketPageLeftContentInfoDate}>Добавлено: {getMyDateCard(comic.createdAt)}</div>
        <div className="MyBasketPageLeftContent__btns"><Button variant="outline-danger" onClick={()=>deleteRow(comic.id)}>Удалить</Button></div>
        </div></div>
        <div className={classes.MyBasketPageLeftContenPrice}>{comic.comic.price} т</div>
        <div>
            <Form>
                <Form.Control value={comic.countComics} onChange={(e)=>updateCount(comic.id, e.target.value)} type="number" min={1} className={classes.MyBasketPageLeftContentCount}></Form.Control>
            </Form>
            </div>
        <div className={classes.MyBasketPageLeftContenPrice}>{comic.summ} т</div>
    </div>
    )
})

export default CardBasketContentItem