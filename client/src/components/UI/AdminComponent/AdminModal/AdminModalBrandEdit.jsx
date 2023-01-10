import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form, Col, Row, Container } from 'react-bootstrap'

const AdminModalBrandEdit = observer(({show, onHide, funcUpdateBrand, brand})=>{
    const [nameBrand, setNameBrand] = useState('')
    useEffect(()=>{
      setNameBrand(brand.name)
    },[])
    useEffect(()=>{
      setNameBrand(brand.name)
    },[brand])
    return(
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Изменить брэнд
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
            <Col md={12} className="mt-3">
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={nameBrand || ''} onChange={(e)=>setNameBrand(e.target.value)} type="text" placeholder="Наименование" />
                    <Form.Text className="text-muted">
                    Укажите наименование брэнда...
                    </Form.Text>
                    </Form.Group>
                </Form>
              </Col>
            </Row>  
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
          <div>
            <Button onClick={()=>funcUpdateBrand(nameBrand, brand.id)} variant={"outline-primary"} className="me-2">Сохранить</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default AdminModalBrandEdit