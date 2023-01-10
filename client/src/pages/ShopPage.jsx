import React, {useContext, useEffect, useState} from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Context } from '../index'
import CategoryBar from '../components/UI/CategoryBar/CategoryBar'
import FilterBar from '../components/UI/FilterBar/FilterBar'
import ComicsList from '../components/UI/ComicsList/ComicsList'
import PaginationBar from '../components/UI/PaginationBar/PaginationBar'
import {fetchCategories, fetchBrands, fetchComics} from '../http/comicApi'
import ModaladdComicInBasket from '../components/UI/MyModals/ModaladdComicInBasket'


const ShopPage = observer(()=>{
    const {comic} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const [isVisisbleModalBasket, setIsVisibleModalBasket] = useState(false)
    const [selectedComicInBasket, setSelectedComicInBasket] = useState({})
    const [sortFilter, setSortFilter] = useState('')
    
    useEffect(()=>{
        fetchCategories().then(data=>{
            comic.setCategories(data)
            fetchBrands().then(data=>{
                comic.setBrands(data)
                fetchComics(null, null, 1, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
                    comic.setComics(data.rows)
                    comic.setTotalCount(data.count)
                    comic.setSelectedCategory({})
                    comic.setSelectedBrand({})
                })
            })
        }).finally(()=>setIsLoading(false))
    },[])

    useEffect(()=>{
        setIsLoading(true)
        fetchComics(comic.selectedCategory.id, comic.selectedBrand.id, comic.page, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
            comic.setComics(data.rows)
            comic.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false))
    },[comic.page, comic.selectedCategory.id, comic.selectedBrand.id, sortFilter, comic.query])

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
        <Container fluid className="mb-5">
            <Row>
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>
                    <FilterBar sortFilter={sortFilter} setSortFilter={setSortFilter}/>
                    <ComicsList addBasketComic={addBasketComic}/>
                    <PaginationBar/>
                </Col>
            </Row>
            <ModaladdComicInBasket show={isVisisbleModalBasket} onHide={()=>setIsVisibleModalBasket(false)} comicBasket={selectedComicInBasket}/>
        </Container>
    )
})

export default ShopPage