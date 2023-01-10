import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Row, Col, Form, Button } from 'react-bootstrap'
import classes from '../../../pages/styles/OrderComicsList.module.css'

const CardReceiptionData = observer(({funcSaveOrder})=>{
    const [Typedelivery, setTypeDelivery] = useState(1)
    const [FIORecipient, setFIORecipient] = useState('')
    const [phoneRecipient, setPhoneRecipient] = useState('')
    const [addressRecipient, setAddressRecipient] = useState('')
    const [commentRecipient, setCommentRecipient] = useState('')

    function getInfoOrder(){
        const delivery = Typedelivery === 1 ? [{title : 'Тип доставки', description : 'Доставка в пункт выдачи'}] : [{title : 'Тип доставки', description : 'Адресная доставка'},{title : 'Адрес', description : addressRecipient}]
        const comicsInfo = [
            {title : "Статус", description : "Оформлен"},
            {title : "ФИО получателя", description : FIORecipient},
            {title : "Мобильный телефон", description : phoneRecipient},
            {title : "Коментарий к заказу", description : commentRecipient},
            ...delivery
        ]
        funcSaveOrder(comicsInfo)
    }

    return(
            <Row className="w-100">
                <Col md={7} className={classes.MyCardReceiptionData}>
                    <h5>Данные получателя:</h5>
                    <div className={classes.MyCardReceiptionDataForm}>
                    <Form className="mt-3">
                        <Form.Control value={FIORecipient} onChange={e=>setFIORecipient(e.target.value)} placeholder="ФИО получателя" className="mb-3"></Form.Control>
                        <Form.Control value={phoneRecipient} onChange={e=>setPhoneRecipient(e.target.value)} placeholder="Мобильный телефон" className="mb-3"></Form.Control>
                        <div className={classes.MyCardReceiptionDataFormCheck}>
                            <Form.Check type="switch" checked={Typedelivery === 1 ? true : false} onChange={()=>setTypeDelivery(1)} label="Доставка в нункт выдачи"/>
                            <Form.Check type="switch" checked={Typedelivery === 2 ? true : false} onChange={()=>setTypeDelivery(2)} label="Адресная доставка"/>
                        </div>
                        {
                           Typedelivery === 2 &&  <Form.Control value={addressRecipient} onChange={e=>setAddressRecipient(e.target.value)} placeholder="Адрес" className="mb-3"></Form.Control>
                        } 
                        <Form.Control as="textarea" value={commentRecipient} onChange={e=>setCommentRecipient(e.target.value)} placeholder="Коментарий к заказу" className="mb-3" rows={5}></Form.Control>
                    </Form>
                    <Button onClick={()=>getInfoOrder()} variant="warning" className="mb-5">Подтвердить</Button>
                    </div>

                </Col>
            </Row>
    )
})

export default CardReceiptionData