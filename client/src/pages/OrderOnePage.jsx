import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import {Container, Col, Row, Spinner} from 'react-bootstrap'
import { fetchOneOrder } from '../http/orderAPI'
import OrderComicsListOne from '../components/UI/OrderComicsList/OrderComicsListOne'
import InfoOrder from '../components/UI/InfoOrder/InfoOrder'

const OrderOnePage = observer(()=>{
    const [order, setOrder] = useState({info : []})
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    const getStatus = (status)=>{
        if(status === 1){
            return <div style={{ borderLeft : '10px solid #0A78D6', display: 'flex', flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', paddingLeft : '20px', height : '70px', fontSize : '15px', fontWeight : 700 }}>Оформлен</div>
        }
        else if(status === 2){
            return <div style={{ borderLeft : '10px solid #EE4B4B', display: 'flex', flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', paddingLeft : '20px', height : '70px', fontSize : '15px', fontWeight : 700 }}>Отменён</div>
        }
        else{
            return <div style={{ borderLeft : '10px solid #739C12', display: 'flex', flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center', paddingLeft : '20px', height : '70px', fontSize : '15px', fontWeight : 700 }}>Выполнен</div>
        }
    }

    useEffect(()=>{
        fetchOneOrder(id).then(data=>{
            setOrder(data)
        }).finally(()=>setIsLoading(false))
    },[])

    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }

    return(
        <Container>
            <Row>
                <Col md={12} className="mt-5 mb-5">
                    <h3 style={{ color: '#DA7B00', fontSize: '22px', fontWeight : 700 }}>Заказ №{order.id} <span style={{ fontSize: '22px', fontWeight : 400 }}>от {getMyDateCard(order.dateOrder)}</span></h3>
                    <div className="mt-3">
                    {getStatus(order.status)}
                    </div>
                    <OrderComicsListOne order_comics={order.order_comics}/>
                    <InfoOrder info={order.info}/>
                </Col>
            </Row>
        </Container>
    )
})

export default OrderOnePage