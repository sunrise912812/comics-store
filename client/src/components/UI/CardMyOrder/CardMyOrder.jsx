import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import { Card } from 'react-bootstrap'
import classes from './CardMyOrder.module.css'
import { useNavigate } from 'react-router-dom'
import { ORDER_ROUTE } from '../../../utils/consts'

const CardMyOrder = observer(({cancelStatus})=>{
    const {order} = useContext(Context)
    const history = useNavigate()
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    const getStatus = (status)=>{
        if(status === 1){
            return <span style={{ color : '#0A78D6' }}>Оформлен</span>
        }
        else if(status === 2){
            return <span style={{ color : '#EE4B4B' }}>Отменён</span>
        }
        else{
            return <span style={{ color : '#739C12' }}>Выполнен</span>
        }
    }
    return(
        <div className={classes.MyCardOrder}>
            {
                order.orders.map((o)=>{
                    return(
                        <Card key={o.id} className={classes.MyCardOrderItem}>
                            <div className={classes.MyCardOrderNumber}>Заказ №{o.id} <span>от {getMyDateCard(o.dateOrder)}</span></div>
                            <div className={classes.MyCardOrderStatus}>{getStatus(o.status)}</div>
                            <div className={classes.MyCardOrderImg}>{o.order_comics.map((c)=>{
                                return(
                                    <div className={classes.MyCardOrderImgItem} key={c.id} style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + c.comic.img})` }}><div className={classes.MyCardOrderImgItemCount}>{c.countComics}</div></div>
                                )
                            })}</div>
                            <div className={classes.MyCardOrderLink} style={o.status === 1 ? {justifyContent : 'space-between'} : {justifyContent : 'flex-end'}}>
                                {o.status === 1 && <div onClick={()=>cancelStatus(o.id)} className={classes.MyCardOrderLinkCancel}>Отменить</div>}
                                <span onClick={()=>history(ORDER_ROUTE + '/' + o.id)}>Подробнее...</span></div>
                        </Card>
                    )
                })
            }
        </div>
    )
})

export default CardMyOrder