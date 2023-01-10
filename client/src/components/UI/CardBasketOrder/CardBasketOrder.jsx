import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'react-bootstrap'
import classes from '../../../pages/styles/BasketPage.module.css'
import { useNavigate } from 'react-router-dom'
import { ORDERING_ROUTE } from '../../../utils/consts'

const CardBasketOrder = observer(({summComics, orderDisabled, funcAddComicsInOrder})=>{
    const history = useNavigate()

    return(
        <div className={classes.CardBasketOrder}>
            <h5>Сумма: <span>{summComics} т</span></h5>
            <Button onClick={()=>funcAddComicsInOrder()} disabled={orderDisabled} variant="warning" className="w-100">Оформить заказ</Button>
        </div>
    )
})

export default CardBasketOrder