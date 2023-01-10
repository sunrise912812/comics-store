import React, {useState, useContext} from 'react'
import { Form, Modal, Button, Row, Col, Container } from 'react-bootstrap'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite'
import classes from './ModaladdComicInBasket.module.css'
import cardStar from '../../../assets/star.png'
import { addComicsInBasket } from '../../../http/basketAPI'
import { useNavigate } from 'react-router-dom'
import { ORDERING_ROUTE } from '../../../utils/consts'

const ModaladdComicInBasket = observer(({show, onHide, comicBasket})=>{
    const {basket, order} = useContext(Context)
    const [countComic, setCountComic] = useState(1)
    const history = useNavigate()

    function funcAddComicInBasket(id){
      addComicsInBasket({comicId : id, countComics : countComic, basketId : basket.basket.id}).then(data=>{
          basket.setCountBasketComics(data)
          setCountComic(1)
          onHide()
      })
    }

    function funcAddComicsInOrder(){
      order.setSelectedOrderComics([{id : 0, comic : comicBasket, countComics : countComic}])
      history(ORDERING_ROUTE)
    }

    return(
    <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить комикс в корзину
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6} className={classes.MyModalBasketLeft}>
                <div style={{backgroundImage : `url(${process.env.REACT_APP_API_URL + comicBasket.img})`}} className={classes.MyModalBasketLeftImg}></div>
              <h5>{comicBasket.name}</h5>
              </Col>
              <Col md={6}>
                <div className={classes.MyModalBasketRight}>
                  <div className={classes.MyModalRightTitle}>Рейтинг: </div>
                  <div className={classes.MyModalRightDescriptionRaiting}><img src={cardStar} alt={cardStar} className={classes.RaitingImg}/>{comicBasket.raiting}</div>
                  <div className={classes.MyModalRightTitle}>Цена: </div>
                  <div className={classes.MyModalRightDescriptionPrice}>{comicBasket.price} т</div>
                  <div className={classes.MyModalRightTitle}>Количество: </div>
                  <div className={classes.MyModalRightDescription}>
                  <Form>
                      <Form.Control type="number" value={countComic} onChange={e=>setCountComic(e.target.value)} min={1}></Form.Control>
                  </Form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
            <div><Button onClick={()=>funcAddComicsInOrder()} variant={"warning"}>Оформить заказ</Button></div>
          <div>
            <Button onClick={()=>funcAddComicInBasket(comicBasket.id)} variant={"outline-primary"} className="me-2">Добавить в корзину</Button>
            <Button onClick={onHide} variant={"outline-danger"}>Закрыть</Button>
          </div>
        </div> 
        </Modal.Footer>
    </Modal>
    )
})

export default ModaladdComicInBasket