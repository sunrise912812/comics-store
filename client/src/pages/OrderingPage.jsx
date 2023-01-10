import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Container } from 'react-bootstrap'
import OrderComicsList from '../components/UI/OrderComicsList/OrderComicsList'
import CardReceiptionData from '../components/UI/CardRecipientData/CardRecipientData'
import classes from './styles/OrderComicsList.module.css'
import { Context } from '../index'
import AlertCard from '../components/UI/AlertCard/AlertCard'
import { deleteBasketComic, fectBasketCountComics } from '../http/basketAPI'
import { createOrder, createOrderComics} from '../http/orderAPI'

const OrderingPage = observer(()=>{
    const {order, basket} = useContext(Context)
    const [show, setShow] = useState(false)
    const [numberOrder, setNumberOrder] = useState(0)

    const funcSaveOrder = (comicsInfo)=>{
        createOrder({info : JSON.stringify(comicsInfo)}).then(data=>{
            setNumberOrder(data.id)
            order.selectedOrderComics.forEach(c=>{
                createOrderComics({orderId : data.id, comicId : c.comic.id, countComics : c.countComics}).then(data=>{
                    if(c.id>0){
                        deleteBasketComic(c.id).then(data=>{
                            fectBasketCountComics().then(data=>{
                                basket.setCountBasketComics(data)
                            })
                        })
                    }
                })
            })
        }
        )
        setShow(true)
    }
    return(
        <Container className={classes.MyOrderComics}>
            {
                show 
                ? 
                    <AlertCard show={show} setShow={setShow} numberOrder={numberOrder}/> 
                : 
                    <div>
                        <h3>Оформление заказа</h3>
                        <OrderComicsList/>
                        <CardReceiptionData funcSaveOrder={funcSaveOrder}/>
                    </div>
            }
        </Container>
    )
})

export default OrderingPage