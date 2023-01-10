import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form, Col, Row, Container, InputGroup, Dropdown } from 'react-bootstrap'
import { Context } from '../../../../index'

const AdminModalComicAdd = observer(({show, onHide, saveComic, nameComic, setNameComic, descriptionComic, setDescriptionComic, priceComic, setPriceComic, fileComic, setFileComic, categoryComic, setCategoryComic, brandComic,  setBrandComic, infoComic, setInfoComic})=>{
    const {comic} = useContext(Context)
    const [imageComicPreview, setImageComicPreview] = useState(null)
    
    const selectFile = event =>{
        setFileComic(event.target.files[0])
        const reader = new FileReader()
        reader.onload = ev => {
            setImageComicPreview(ev.target.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const addInfo = ()=>{
        setInfoComic([...infoComic, {title : '', description : '', number : Date.now()}])
    }
    const removeInfo = (number)=>{
        setInfoComic(infoComic.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number)=>{
        setInfoComic(infoComic.map((i)=> i.number === number ? {...i, [key] : value} : i))
    }
    return(
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новый комикс
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
            <Col md={12} className="mt-3">
                <Form>
                <Dropdown className="mt-3 mb-3">
                    <Dropdown.Toggle>{categoryComic.name || 'Выберите категорию'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            comic.categories.map((category)=>{
                                return(
                                    <Dropdown.Item 
                                    key={category.id} 
                                    onClick={()=>setCategoryComic(category)}>{category.name}</Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="mt-3 mb-3">
                    <Dropdown.Toggle>{brandComic.name || 'Выберите брэнд'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            comic.brands.map((brand)=>{
                                return(
                                    <Dropdown.Item 
                                    key={brand.id} 
                                    onClick={()=>setBrandComic(brand)}>{brand.name}</Dropdown.Item>
                                )
                            })
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control value={nameComic || ''} onChange={(e)=>setNameComic(e.target.value)} type="text" placeholder="Наименование" />
                </Form.Group>
                <InputGroup>
                      <InputGroup.Text>Описание:</InputGroup.Text>
                      <Form.Control as="textarea" value={descriptionComic} onChange={e=>setDescriptionComic(e.target.value)} rows={5}></Form.Control>
                  </InputGroup>
                  <Form.Control 
                    type="number"
                    placeholder="Введите цену комикса" 
                    className="mt-3 mb-3"
                    value={priceComic}
                    onChange={e=>setPriceComic(Number(e.target.value))}/>
                    {imageComicPreview && <div style={{ backgroundImage : `url(${imageComicPreview})`, width : '100px', height : '150px', backgroundSize : 'cover', backgroundRepeat : 'no-repeat', backgroundPosition : 'center' }}></div>}
                <Form.Control type="file" className="mt-3 mb-3" onChange={selectFile}/>
                <hr/>
                <Button variant="outline-dark" onClick={addInfo}>Добавить новое свойство</Button>
                {
                    infoComic.map((i)=>{
                        return(
                            <Row className="mt-3" key={i.number}>
                                <Col md={4}>
                                    <Form.Control 
                                    placeholder="Введите название"
                                    value={i.title}
                                    onChange={(e)=>changeInfo('title', e.target.value, i.number)}/>
                                </Col>
                                <Col md={4}>
                                    <Form.Control 
                                    placeholder="Введите описание"
                                    value={i.description}
                                    onChange={(e)=>changeInfo('description', e.target.value, i.number)}/>
                                </Col>
                                <Col md={4}>
                                    <Button variant="outline-danger" onClick={()=>removeInfo(i.number)}>Удалить</Button>
                                </Col>
                            </Row>
                        )

                    })
                }
                </Form>
              </Col>
            </Row>  
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-end w-100">
          <div>
            <Button onClick={()=>saveComic()} variant={"outline-primary"} className="me-2">Сохранить</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default AdminModalComicAdd