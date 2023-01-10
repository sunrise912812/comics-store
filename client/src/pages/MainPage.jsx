import React, {useContext, useEffect, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Row, Col } from 'react-bootstrap'
import CarouselBar from '../components/UI/CorouselBar/CorouselBar'
import CardBar from '../components/UI/CardBrand/CardBrand'
import CardTopComics from '../components/UI/CardTopComics/CardTopComics'
import { Context } from '../index'
import { fecthComicsTop } from '../http/comicApi'
import { fetchBanerImgs } from '../http/banerAPI'
import { Spinner } from 'react-bootstrap'
import ModaladdComicInBasket from '../components/UI/MyModals/ModaladdComicInBasket'
 
const MainPage = observer(()=>{
    const {baner, comic} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [isVisisbleModalBasket, setIsVisibleModalBasket] = useState(false)
    const [selectedComicInBasket, setSelectedComicInBasket] = useState({})
    useEffect(()=>{
        fetchBanerImgs().then(data=>{
            baner.setBaners(data)
        })
        fecthComicsTop().then(data=>{
            comic.setTopComics(data)
        }).finally(()=>setIsLoading(false))
    },[])

    const addBasketComic = (comicBasket)=>{
        setSelectedComicInBasket(comicBasket)
        setIsVisibleModalBasket(true)
    }

    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }
    return(
        <div className="w-100 m-0 p-0">
            <Row className="w-100 m-0 p-0">
                <Col md={12} className="w-100 m-0 p-0">
                    <CarouselBar/>  
                </Col>
            </Row>
            <Container>
            <Row>
                <h4 style={{marginTop:'20px'}}>Меню</h4>
                <Col md={12}>
                    <CardBar/> 
                </Col>
            </Row>
            <Row>
                <h4 style={{marginTop:'20px'}}>Выбор покупателей</h4>
                <Col md={12}>
                    <CardTopComics addBasketComic={addBasketComic}/>
                </Col>
            </Row>
            <ModaladdComicInBasket show={isVisisbleModalBasket} onHide={()=>setIsVisibleModalBasket(false)} comicBasket={selectedComicInBasket}/>
            </Container>
        </div>
    )
})

export default MainPage