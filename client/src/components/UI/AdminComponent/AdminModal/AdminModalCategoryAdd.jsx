import React from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form, Col, Row, Container } from 'react-bootstrap'

const AdminModalCategoryAdd = observer(({show, onHide, saveCategory, nameCategory, setNameCategory})=>{
    return(
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новую категорию
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
            <Col md={12} className="mt-3">
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={nameCategory || ''} onChange={(e)=>setNameCategory(e.target.value)} type="text" placeholder="Наименование" />
                    <Form.Text className="text-muted">
                    Укажите наименование категории...
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
            <Button onClick={()=>saveCategory(nameCategory)} variant={"outline-primary"} className="me-2">Сохранить</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default AdminModalCategoryAdd