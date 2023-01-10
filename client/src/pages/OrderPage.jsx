import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { fetchOrders, addInfoOrder } from '../http/orderAPI'
import { Spinner, Container, Row, Col } from 'react-bootstrap'
import { Context } from '../index'
import CardMyOrder from '../components/UI/CardMyOrder/CardMyOrder'
import PaginationBarOrder from '../components/UI/PaginationBar/PaginationBarOrder'

const OrderPage = observer(()=>{
    const {order} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        fetchOrders(1, 5).then(data=>{
            order.setOrders(data.rows)
            order.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false)) 
    },[])

    useEffect(()=>{
        setIsLoading(true)
        fetchOrders(order.page, 5).then(data=>{
            order.setOrders(data.rows)
            order.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false))  
    },[order.page])

    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }

      function cancelStatus(id){
        setIsLoading(true)
        addInfoOrder(id, {info : JSON.stringify([{title : "Статус", description : "Отменен"}])}).then(data=>{
            fetchOrders(order.page, 5).then(data=>{
                order.setOrders(data.rows)
                order.setTotalCount(data.count)
            })
        }).finally(()=>setIsLoading(false))  
    }

    return(
        <Container>
            <Row>
                <Col md={12} className="mt-3 mb-5">
                    <h3 style={{ color: '#E8AD52' }}>Мои заказы</h3>
                    <CardMyOrder cancelStatus={cancelStatus}/>
                    <PaginationBarOrder/>
                </Col>
            </Row>
        </Container>
    )
})

export default OrderPage