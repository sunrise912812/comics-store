import React from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Row, Col } from 'react-bootstrap'
import classes from './styles/ContactsPage.module.css'

const ContactsPage = observer(()=>{
    return(
        <Container>
            <Row>
                <Col md={12} className="mt-3 mb-5">
                    <h3 className={classes.MyContactsHeader}>Контакты</h3>
                    <div className={classes.MyContacts}>
                        <div className={classes.MyContactsItem}>
                            <div>ФИО разработчика:</div>
                            <div>Базаркин Павел Вячеславович</div>
                        </div>
                        <div className={classes.MyContactsItem}>
                            <div>Мобильный телефон:</div>
                            <div>8747*******</div>
                        </div>
                        <div className={classes.MyContactsItem}>
                            <div>Адрес:</div>
                            <div>г.Петропавловск ул.**** ** *****</div>
                        </div>
                        
                    </div>
                </Col>
            </Row>
        </Container>
    )
})

export default ContactsPage