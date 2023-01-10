import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../index'
import { fetchOrdersAdmin, deleteOrder, addInfoOrder } from '../../../../http/orderAPI'
import AdminOrderList from '../AdminComponentList/AdminOrderList'
import { Spinner, Form, Button } from 'react-bootstrap'
import PaginationBarOrder from '../../PaginationBar/PaginationBarOrder'

const AdminOrderPage = observer(()=>{
    const [numberOrderFind, setNumberOrderFind] = useState('')
    const {order} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        fetchOrdersAdmin(1, 5, {query : numberOrderFind}).then(data=>{
            order.setOrders(data.rows)
            order.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false))
    },[])
    useEffect(()=>{
        fetchOrdersAdmin(order.page, 5, {query : numberOrderFind}).then(data=>{
            order.setOrders(data.rows)
            order.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false))
    },[order.page, numberOrderFind])
    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }
      function funcDeleteOrder(id){
        setIsLoading(true)
        deleteOrder(id).then(data=>{
            fetchOrdersAdmin(order.page, 5, {query : numberOrderFind}).then(data=>{
                order.setOrders(data.rows)
                order.setTotalCount(data.count)
            })
        }).finally(()=>setIsLoading(false))  
      }
      function updateStatus(status, id){
        setIsLoading(true)
        addInfoOrder(id, {info : JSON.stringify([{title : "Статус", description : status}])}).then(data=>{
            fetchOrdersAdmin(order.page, 5, {query : numberOrderFind}).then(data=>{
                order.setOrders(data.rows)
                order.setTotalCount(data.count)
            })
        }).finally(()=>setIsLoading(false))  
      }
    return(
        <div>
        <h5 style={{marginBottom:'20px'}}>Заказы:</h5>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Поиск по номеру заказа"
              className="me-2"
              aria-label="Search"
              value={numberOrderFind}
              onChange={(e)=>setNumberOrderFind(e.target.value)}
            />
          </Form>
            <AdminOrderList orders={order.orders} funcDeleteOrder={funcDeleteOrder} updateStatus={updateStatus}/>
            <PaginationBarOrder/>
        </div>
    )
})

export default AdminOrderPage