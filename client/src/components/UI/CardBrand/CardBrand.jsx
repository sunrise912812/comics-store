import React, { useContext } from 'react'
import classes from './CardBrand.module.css'
import { SHOP_ROUTE, ORDER_ROUTE, BASKET_ROUTE, CONTACT_ROUTE, HELP_ROUTE } from '../../../utils/consts'
import { NavLink } from 'react-router-dom'
import { Book, BagCheck, Cart4, Telephone, QuestionCircle } from 'react-bootstrap-icons';
import { Context } from '../../../index'
import { useNavigate } from 'react-router-dom';

const CardBrand = ()=>{
    const history = useNavigate()
    const {comic} = useContext(Context)
    function getshop(){
        comic.setQuery('')
        history(SHOP_ROUTE)
      }
    return(
        <div className={classes.MyCardBar}>
             <div onClick={()=>getshop()} className={classes.MyCardBarShop}>
<Book size={60} color={"#0A78D6"}/>
                <p>Каталог</p>
            </div>
            <NavLink to={ORDER_ROUTE}>
            <div>
            <BagCheck size={60} color={"#0A78D6"}/>
                <p>Мои заказы</p>
            </div>
            </NavLink>
            <NavLink to={BASKET_ROUTE}>
            <div><Cart4 size={60} color={"#0A78D6"}/>
                <p>Корзина</p>
            </div>
            </NavLink>
            <NavLink to={CONTACT_ROUTE }>
            <div>
<Telephone size={60} color={"#0A78D6"}/>
                <p>Контакты</p>
            </div>
            </NavLink>
            <NavLink to={HELP_ROUTE}>
            <div>             
            <QuestionCircle size={60} color={"#0A78D6"}/>
                <p>Помощь</p>
            </div>
            </NavLink>     
        </div>
    )
}

export default CardBrand