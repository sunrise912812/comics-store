import React, {useContext, useEffect, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import classes from './styles/BasketPage.module.css'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { fecthBasketComics } from '../http/basketAPI'
import CardBasketContent from '../components/UI/CardBasketContent/CardBasketContent'
import CardBasketOrder from '../components/UI/CardBasketOrder/CardBasketOrder'
import { ORDERING_ROUTE } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import './styles/animation.css'

const BasketPage = observer(()=>{
    const {basket, order} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [summComics, setSummComics] = useState(0)
    const [checkFull, setCheckFull] = useState(false)
    const [orderDisabled, setoOrderDisabled] = useState(true)
    const [orderComics, setOrderComics] = useState([])
    const history = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('basketid')){
            fecthBasketComics(localStorage.getItem('basketid')).then(data=>{
                basket.setBasketComics(data.rows)
            }).finally(()=>setIsLoading(false))
        }
    },[])
    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
            <Spinner animation="border" variant="primary" />
        </div>)
      }
      function summOrder(comics){
        let summ = 0
        summ = comics.reduce((total, c)=> total + c.summ, 0)
        setSummComics(summ)
        if(summ > 0){
            setoOrderDisabled(false)
        }else{
            setoOrderDisabled(true)
        }
        setOrderComics(comics)
      }
      function funcFullCheck(bool){
        if(bool){
            let summ = 0
            summ = basket.basketComics.reduce((total, c)=> total + c.summ, 0)
            setCheckFull(bool)
            setSummComics(summ)
            if(summ > 0){
                setoOrderDisabled(false)
            }else{
                setoOrderDisabled(true)
            }
        }else{
            setCheckFull(bool)
            setSummComics(0)
            setoOrderDisabled(true)
        }
        setOrderComics(basket.basketComics)
      }
      function funcAddComicsInOrder(){
        order.setSelectedOrderComics(orderComics.map((c)=>{
            return(
                {id : c.id, comic : c.comic, countComics : c.countComics}
            )
        }))
        history(ORDERING_ROUTE)
      }
    return(
        <Container fluid className={classes.MyBasketPage}>
            <h3>Корзина</h3>
            <Row>
                <Col md={9}>
                    <div className={classes.MyBasketPageLeft}>
                        <div>
                            <Form>
                                <Form.Check value={checkFull} onChange={(e)=>funcFullCheck(e.target.checked)} type="checkbox" />
                            </Form>
                        </div>
                        <div className={classes.MyBasketPageLeftMain}>Товары добавленные в корзину</div>
                        <div>Цена</div>
                        <div>Количество</div>
                        <div>Сумма</div>
                    </div>
                    <CardBasketContent summOrder={summOrder} checkFull={checkFull}/>
                </Col>
                <Col md={3}>
                <div className={classes.MyBasketPageRight}>
                    <div>Оформить заказ</div>
                </div>
                <CardBasketOrder summComics={summComics} orderDisabled={orderDisabled} funcAddComicsInOrder={funcAddComicsInOrder}/>
                </Col>
            </Row>
        </Container>
    )
})

export default BasketPage