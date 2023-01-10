import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Container, Row, Col, Button, Form, Dropdown, InputGroup } from 'react-bootstrap'

const ModalAddComment = observer(({show, onHide, addReview})=>{
    const [Raiting, setRaiting] = useState(0)
    const [textComment, setTextComment] = useState('')
    let rate = []
    for (let i=0; i<5; i++){
        rate.push(i+1)
    }
    return(
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить отзыв
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12}>
                <div className="d-flex justify-content-start align-items-center">
                    <h5 className="me-2">Рейтинг:</h5>
                    <Dropdown>
      <Dropdown.Toggle variant="warning" id="dropdown-basic">
        {Raiting !== 0 ? Raiting  : 'Укажите оценку'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
            rate.map((r)=>{
                return(
                    <Dropdown.Item key={r} onClick={()=>setRaiting(r)}>{r}</Dropdown.Item>
                )
            })
        }
      </Dropdown.Menu>
    </Dropdown>
                </div>
              </Col>
            </Row>
            <Row>
            <Col md={12} className="mt-3">
                <InputGroup>
                      <InputGroup.Text>Отзыв:</InputGroup.Text>
                      <Form.Control as="textarea" value={textComment} onChange={e=>setTextComment(e.target.value)} rows={5}></Form.Control>
                  </InputGroup>
              </Col>
            </Row>  
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
          <div>
            <Button onClick={()=>addReview(Raiting, textComment)} variant={"outline-primary"} className="me-2">Добавить отзыв</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default ModalAddComment