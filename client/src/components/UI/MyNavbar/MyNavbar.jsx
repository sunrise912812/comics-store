import React, {useContext, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, ORDER_ROUTE, BASKET_ROUTE, SHOP_ROUTE, CONTACT_ROUTE, HELP_ROUTE } from '../../../utils/consts'
import { Form, Button } from 'react-bootstrap'
import classes from './MyNavbar.module.css'
import { Cart2, PersonCircle } from 'react-bootstrap-icons';
import { Context } from "../../../index";


const MyNavbar = observer(()=>{
  const history = useNavigate()
  const {user, basket, comic} = useContext(Context)
  const [query, setQuery] = useState('')
  const logOut =()=>{
      user.setUser({})
      user.setIsAuth(false)
      basket.setBasket({})
      localStorage.removeItem('token')
      localStorage.removeItem('basketid')
  }
  function funcSearch(){
    comic.setQuery(query)
    history(SHOP_ROUTE)
  }
  function getshop(){
    comic.setQuery('')
    history(SHOP_ROUTE)
  }
  function getAdmin(){
    comic.setQuery('')
    history(ADMIN_ROUTE)
  }
    return(
          <nav className={classes.MyNavbar}>
            <div className={classes.MyNavbarleft}>
              <div className={classes.MyNavbarleftCatalog} onClick={()=>getshop()}>
                <div></div>
                <div></div>
                <div></div>
                <p>Каталог</p>
              </div>
              <NavLink to={MAIN_ROUTE} className={classes.iconBar}></NavLink>
              <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Поиск"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <Button onClick={()=>funcSearch()} variant="warning">Найти</Button>
          </Form>
            </div>
            <div className={classes.MyNavbarright}>
              <ul>
                <li className={classes.dropDownListNavbar}>
                <PersonCircle color={"white"} size={30}/>

  {user.isAuth
  ?
  <ul><li onClick={()=>history(ORDER_ROUTE)}>Мои заказы</li>
  <li onClick={()=>logOut()}>Выйти</li>
  <li onClick={()=>history(CONTACT_ROUTE)}>Контакты</li>
  <li onClick={()=>history(HELP_ROUTE)}>Помощь</li>
  </ul>
  :
  <ul><li onClick={()=>history(LOGIN_ROUTE)}>Войти</li>
  <li onClick={()=>history(REGISTRATION_ROUTE)}>Регистрация</li>
  <li onClick={()=>history(CONTACT_ROUTE)}>Контакты</li>
  <li onClick={()=>history(HELP_ROUTE)}>Помощь</li>
  </ul>
  }

</li>
                <li><div className={classes.MyNavbarBasket} onClick={()=>history(BASKET_ROUTE)}><Cart2 color={"white"} size={30} className="me-5"/>{user.isAuth && <div className={classes.MyNavbarBasketCount}>{basket.countBasketComics}</div>}</div></li>
              </ul>
              {
                user.user.role === 'ADMIN' && <Button variant="outline-light" className="me-5" onClick={()=>getAdmin()}>Админ панель</Button>
              }
            </div>   
          </nav>
    )
})

export default MyNavbar