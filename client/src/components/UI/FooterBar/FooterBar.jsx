import React, { useContext } from 'react'
import classes from './FooterBar.module.css'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE, ORDER_ROUTE, BASKET_ROUTE, CONTACT_ROUTE, HELP_ROUTE } from '../../../utils/consts'
import comicsFooter from '../../../assets/comicsFooter.png'
import { Row, Col } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import { useNavigate } from 'react-router-dom'


const FooterBar = observer(()=>{
    const history = useNavigate()
    const {comic} = useContext(Context)
    function getshop(){
        comic.setQuery('')
        history(SHOP_ROUTE)
      }
    return(
<div className="w-100 m-0 p-0">
        <Row className="w-100 m-0 p-0">
            <Col md={12} className="w-100 m-0 p-0">
    <div className={classes.MyFooterBar}>
        <div>
            <img src={comicsFooter} alt={comicsFooter}/>
        </div>
        <div className={classes.MyFooterBarLink}>
            <div className={classes.MyFooterBarLinkToShop} onClick={()=>getshop()}>Каталог</div>
            <NavLink to={ORDER_ROUTE}>Мои заказы</NavLink>
            <NavLink to={BASKET_ROUTE}>Корзина</NavLink>
            <NavLink to={CONTACT_ROUTE}>Контакты</NavLink>
            <NavLink to={HELP_ROUTE}>Помощь</NavLink>
        </div>
    </div>
    </Col>
    </Row>
</div>
    )
})

export default FooterBar