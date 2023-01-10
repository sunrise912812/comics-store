import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import classes from '../../CardMyOrder/CardMyOrder.module.css'

const AdminOrderList = observer(({orders, funcDeleteOrder, updateStatus})=>{
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
            orders.map((o)=>{
                return(
                    <Card key={o.id} className={classes.MyCardOrderItem}>
                        <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                        <div>
                        <div className={classes.MyCardOrderNumber}>Заказ №{o.id} <span>от {getMyDateCard(o.dateOrder)}</span></div>
                        <div className={classes.MyCardOrderStatus}>{getStatus(o.status)}</div>
                        <div className={classes.MyCardOrderImg}>{o.order_comics.map((c)=>{
                            return(
                                <div className={classes.MyCardOrderImgItem} key={c.id} style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + c.comic.img})` }}><div className={classes.MyCardOrderImgItemCount}>{c.countComics}</div></div>
                            )
                        })}</div>
                        </div>
                        <div>
                            <DropdownButton style={{ marginRight : '15px'}} as={ButtonGroup} title="Изменить статус" id="bg-nested-dropdown">
                                <Dropdown.Item onClick={()=>updateStatus("Оформлен", o.id)}>Оформлен</Dropdown.Item>
                                <Dropdown.Item onClick={()=>updateStatus("Отменен", o.id)}>Отменен</Dropdown.Item>
                                <Dropdown.Item onClick={()=>updateStatus("Выполнен", o.id)}>Выполнен</Dropdown.Item>
                            </DropdownButton>
                            <Button onClick={()=>funcDeleteOrder(o.id)} variant="danger">Удалить</Button>
                        </div>
                        </div>
                    </Card>
                )
            })
        }
    </div>
    )
})

export default AdminOrderList