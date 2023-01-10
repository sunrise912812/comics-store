import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'

const AdminModalBanerAdd = observer(({show, onHide, saveBaner, fileBaner, setFileBaner, linkBaner, setLinkBaner, descriptionBaner, setDescriptionBaner})=>{
    const [imageComicPreview, setImageComicPreview] = useState(null)
    
    const selectFile = event =>{
        setFileBaner(event.target.files[0])
        const reader = new FileReader()
        reader.onload = ev => {
            setImageComicPreview(ev.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }
    return(
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новое изображение
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
            <Col md={12} className="mt-3">
                <Form>
                <Form.Control type="file" className="mt-3 mb-3" onChange={selectFile}/>
                {imageComicPreview && <div style={{ backgroundImage : `url(${imageComicPreview})`, width : '350px', height : '200px', backgroundSize : 'cover', backgroundRepeat : 'no-repeat', backgroundPosition : 'center' }}></div>}
                <Form.Control className="mt-3 mb-3"  value={linkBaner || ''} onChange={(e)=>setLinkBaner(e.target.value)} type="text" placeholder="Ссылка" />
                <InputGroup>
                      <InputGroup.Text>Описание:</InputGroup.Text>
                      <Form.Control as="textarea" value={descriptionBaner || ''} onChange={e=>setDescriptionBaner(e.target.value)} rows={5}></Form.Control>
                  </InputGroup>
                </Form>
              </Col>
            </Row>  
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
          <div>
            <Button onClick={()=>saveBaner()} variant={"outline-primary"} className="me-2">Сохранить</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default AdminModalBanerAdd