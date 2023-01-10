import React, {useEffect, useState, useContext} from 'react'
import { observer } from 'mobx-react-lite'
import {Container, Col, Row, Spinner} from "react-bootstrap";
import cardStar from '../assets/star.png'
import classes from './styles/ComicOnePage.module.css'
import { useParams } from 'react-router-dom'
import { fetchOneComic, addCommentComic } from '../http/comicApi'
import CardBasket from '../components/UI/CardBasket/CardBasket';
import CardComicInfo from '../components/UI/CardComicInfo/CardComicInfo';
import CardReviews from '../components/UI/CardReviews/CardReviews';
import CardReviewAdd from '../components/UI/CardReviewAdd/CardReviewAdd';
import ModalAddComment from '../components/UI/MyModals/ModalAddComment';
import { Context } from '../index'

const ComicOnePage = observer(()=>{
    const {user} = useContext(Context)
    const [comic, setComic] = useState({info : [], comment : []})
    const [isLoading, setIsLoading] = useState(true)
    const [isVisisbleModalReview, setIsVisibleModalReview] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
            fetchOneComic(id).then(data=>{
                setComic(data)
            }).finally(()=>setIsLoading(false))
    },[])
    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }

      function funcVisibleModal(bool){
        setIsVisibleModalReview(bool)
      }

      const funcAddReview = (ocenka, textComment)=>{
            setIsVisibleModalReview(false)
            setIsLoading(true)
            addCommentComic({rate : ocenka, userId : user.user.id, comicId : comic.id, text : textComment}).then(data=>{
                fetchOneComic(comic.id).then(data=>{
                    setComic(data)
                })
            }).finally(()=>setIsLoading(false))
      }
    return(
        <Container className="mt-3 mb-3" fluid>
            <Row>
                <Col md={3} className={classes.ComicOnePageLeft}>
                    <div className={classes.ComicOneMainImg} style={{backgroundImage : `url(${process.env.REACT_APP_API_URL + comic.img})`}}></div>
                    <CardComicInfo info={comic.info}/>
                </Col>
                <Col md={6} className={classes.ComicOneCenter}>
                <h3 className={classes.ComicOneCenterName}>{comic.name}</h3>
                <div className={classes.ComicOneCenterRaiting}>Рейтинг: <img src={cardStar} alt={cardStar}/><span>{comic.raiting}</span></div>
                <div className={classes.ComicOneCenterPrice}>Цена: <span>{comic.price} т</span></div>
                <div className={classes.ComicOneCenterDescription}><p>Описание: <span>{comic.description}</span></p></div>
                </Col>
                <Col md={3}>
                    <CardBasket comic={comic}/>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <CardReviews comment={comic.comment}/>
                </Col>
                <Col md={4}>
                    <CardReviewAdd comic={comic} showmodal={funcVisibleModal}/>
                </Col>
            </Row>
            <ModalAddComment show={isVisisbleModalReview} onHide={()=>setIsVisibleModalReview(false)} addReview={funcAddReview} />
        </Container>
    )
})

export default ComicOnePage