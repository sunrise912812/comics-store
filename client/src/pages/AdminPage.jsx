import React, { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import AdminBtn from '../components/UI/AdminComponent/AdminBtn'
import AdminCategoryPage from '../components/UI/AdminComponent/AdminPage/AdminCategoryPage'
import AdminBrandPage from '../components/UI/AdminComponent/AdminPage/AdminBrandPage'
import AdminComicPage from '../components/UI/AdminComponent/AdminPage/AdminComicPage'
import AdminOrderPage from '../components/UI/AdminComponent/AdminPage/AdminOrderPage'
import AdminBanerPage from '../components/UI/AdminComponent/AdminPage/AdminBanerPage'
import { Context } from '../index'
import {fetchCategories, fetchBrands, fetchComics, createCategory, deleteCategory, updateCategory, createBrand, deleteBrand, updateBrand, createComic, updateComic, deleteComic, fetchOneComic} from '../http/comicApi'
import { fetchBanerImgs, deleteBanerImg, createBanerImg } from '../http/banerAPI'
import AdminModalCategoryAdd from '../components/UI/AdminComponent/AdminModal/AdminModalCategoryAdd'
import AdminModalCategoryEdit from '../components/UI/AdminComponent/AdminModal/AdminModalCategoryEdit'
import AdminModalBrandAdd from '../components/UI/AdminComponent/AdminModal/AdminModalBrandAdd'
import AdminModalBrandEdit from '../components/UI/AdminComponent/AdminModal/AdminModalBrandEdit'
import AdminModalComicAdd from '../components/UI/AdminComponent/AdminModal/AdminModalComicAdd'
import AdminModalComicEdit from '../components/UI/AdminComponent/AdminModal/AdminModalComicEdit'
import AdminModalBanerAdd from '../components/UI/AdminComponent/AdminModal/AdminModalBanerAdd'

const AdminPage = observer(()=>{
    const [typeEdit, setTypeEdit] = useState('category')
    const [sortFilter, setSortFilter] = useState('createdAt_desc')
    const [isLoading, setIsLoading] = useState(true)

    const [isVisisbleModalCategoryAdd, setIsVisibleModalCategoryAdd] = useState(false)
    const [isVisisbleModalCategoryEdit, setIsVisibleModalCategoryEdit] = useState(false)
    const [nameCategory, setNameCategory] = useState('')
    const [selectedCategory, setSelectedCategory] = useState({})

    const [isVisisbleModalBrandAdd, setIsVisibleModalBrandAdd] = useState(false)
    const [isVisisbleModalBrandEdit, setIsVisibleModalBrandEdit] = useState(false)
    const [nameBrand, setNameBrand] = useState('')
    const [selectedBrand, setSelectedBrand] = useState({})

    const [isVisisbleModalComicAdd, setIsVisibleModalComicAdd] = useState(false)
    const [isVisisbleModalComicEdit, setIsVisibleModalComicEdit] = useState(false)
    const [nameComic, setNameComic] = useState('')
    const [descriptionComic, setDescriptionComic] = useState('')
    const [priceComic, setPriceComic] = useState(0)
    const [fileComic, setFileComic] = useState(null)
    const [categoryComic, setCategoryComic] = useState({})
    const [brandComic, setBrandComic] = useState({})
    const [infoComic, setInfoComic] = useState([])
    const [selectedComic, setSelectedComic] = useState({})

    const [isVisisbleModalBanerAdd, setIsVisibleModalBanerAdd] = useState(false)
    const [fileBaner, setFileBaner] = useState(null)
    const [linkBaner, setLinkBaner] = useState('')
    const [descriptionBaner, setDescriptionBaner] = useState('')

    const {comic, baner} = useContext(Context)
    
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
                    fetchBanerImgs().then(data=>{
                        baner.setBaners(data)
                    })
                })
            })
        }).finally(()=>setIsLoading(false))
    },[])

    useEffect(()=>{
        setIsLoading(true)
        fetchComics(null, null, comic.page, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
            comic.setComics(data.rows)
            comic.setTotalCount(data.count)
        }).finally(()=>setIsLoading(false))
    },[comic.page, sortFilter, comic.query])

    function funcVisibleModalCategoryAdd(bool){
        setIsVisibleModalCategoryAdd(bool)
        setNameCategory('')
      }

      function saveCategory(value){
        createCategory({name : value}).then(data=>{
            fetchCategories().then(data=>{
                comic.setCategories(data)
            })
        }).finally(()=>setIsVisibleModalCategoryAdd(false))
    }

    function funcUpdateCategory(value, id){
        updateCategory(id, {name : value}).then(data=>{
            fetchCategories().then(data=>{
                comic.setCategories(data)
            })
        }).finally(()=>setIsVisibleModalCategoryEdit(false))
    }

    function funcdeleteCategory(id){
        deleteCategory(id).then(data=>{
            fetchCategories().then(data=>{
                comic.setCategories(data)
            })
        })
    }

    function editCategoryShow(category){
        setSelectedCategory(category)
        setIsVisibleModalCategoryEdit(true)
    }


    function funcVisibleModalBrandAdd(bool){
        setIsVisibleModalBrandAdd(bool)
        setNameBrand('')
      }

      function saveBrand(value){
        createBrand({name : value}).then(data=>{
            fetchBrands().then(data=>{
                comic.setBrands(data)
            })
        }).finally(()=>setIsVisibleModalBrandAdd(false))
    }

    function funcUpdateBrand(value, id){
        updateBrand(id, {name : value}).then(data=>{
            fetchBrands().then(data=>{
                comic.setBrands(data)
            })
        }).finally(()=>setIsVisibleModalBrandEdit(false))
    }

    function funcdeleteBrand(id){
        deleteBrand(id).then(data=>{
            fetchBrands().then(data=>{
                comic.setBrands(data)
            })
        })
    }

    function editBrandShow(brand){
        setSelectedBrand(brand)
        setIsVisibleModalBrandEdit(true)
    }

    function funcVisibleModalComicAdd(bool){
        setIsVisibleModalComicAdd(bool)
        setNameComic('')
        setDescriptionComic('')
        setPriceComic(0)
        setFileComic(null)
        setCategoryComic({})
        setBrandComic({})
        setInfoComic([])
      }

    function saveComic(){
        setIsVisibleModalComicAdd(true)
        const formData = new FormData()
        formData.append('name', nameComic)
        formData.append('description', descriptionComic)
        formData.append('price', `${priceComic}`)
        formData.append('img', fileComic)
        formData.append('categoryId', categoryComic.id)
        formData.append('brandId', brandComic.id)
        formData.append('info', JSON.stringify(infoComic))
        createComic(formData).then(data=>{
            fetchComics(null, null, 1, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
                comic.setComics(data.rows)
                comic.setTotalCount(data.count)
            })
        }).finally(()=>setIsVisibleModalComicAdd(false))
    }

    function funcUpdateComic(nameComic, descriptionComic, priceComic, fileComic, categoryComic, brandComic, infoComic, id){
        const formData = new FormData()
        formData.append('name', nameComic)
        formData.append('description', descriptionComic)
        formData.append('price', `${priceComic}`)
        if(fileComic){
            formData.append('img', fileComic)
        }
        formData.append('categoryId', categoryComic.id)
        formData.append('brandId', brandComic.id)
        formData.append('info', JSON.stringify(infoComic))

        updateComic(id, formData).then(data=>{
            fetchComics(null, null, 1, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
                comic.setComics(data.rows)
                comic.setTotalCount(data.count)
            })
        }).finally(()=>setIsVisibleModalComicEdit(false))
    }

    function funcdeleteComic(id){
        deleteComic(id).then(data=>{
            fetchComics(null, null, 1, 5, {sort : sortFilter}, {query : comic.query}).then(data=>{
                comic.setComics(data.rows)
                comic.setTotalCount(data.count)
            })
        })
    }

    function editComicShow(comic){
        setIsLoading(true)
        fetchOneComic(comic.id).then(data=>{
            setSelectedComic(data)
            setIsVisibleModalComicEdit(true)
        }).finally(()=>setIsLoading(false))
        
    }

    function funcVisibleModalBanerAdd(bool){
        setIsVisibleModalBanerAdd(bool)
        setFileBaner(null)
        setLinkBaner('')
        setDescriptionBaner('')
      }

    function funcDeleteBaner(id){
        deleteBanerImg(id).then(data=>{
            fetchBanerImgs().then(data=>{
                baner.setBaners(data)
            })
        })
    }

    function saveBaner(){
        setIsVisibleModalBanerAdd(true)
        const formData = new FormData()
        formData.append('img', fileBaner)
        formData.append('link', linkBaner)
        formData.append('description', descriptionBaner)
        createBanerImg(formData).then(data=>{
            fetchBanerImgs().then(data=>{
                baner.setBaners(data)
            })
        }).finally(()=>setIsVisibleModalBanerAdd(false))
    }

    if (isLoading){
        return (
        <div style={{ display: 'flex', alignItems : 'center', justifyContent : 'center', margin : '50px' }}>
                    <Spinner animation="border" variant="primary" />
        </div>)
      }

    return(
        <Container>
            <Row>
                <Col md={12} className="mt-3 mb-5">
                    <h3 style={{color: '#0A78D6', marginBottom : '20px'}}>Админ панель</h3>
                    <AdminBtn typeEdit={typeEdit} setTypeEdit={setTypeEdit}/>
                    {typeEdit === 'category' && <AdminCategoryPage showmodal={funcVisibleModalCategoryAdd} categories={comic.categories} funcdeleteCategory={funcdeleteCategory} editCategoryShow={editCategoryShow}/>}
                    {typeEdit === 'brand' && <AdminBrandPage showmodal={funcVisibleModalBrandAdd} brands={comic.brands} funcdeleteBrand={funcdeleteBrand} editBrandShow={editBrandShow}/>}
                    {typeEdit === 'comic' && <AdminComicPage showmodal={funcVisibleModalComicAdd} comics={comic.comics} sortFilter={sortFilter} setSortFilter={setSortFilter} funcdeleteComic={funcdeleteComic} editComicShow={editComicShow}/>}
                    {typeEdit === 'order' && <AdminOrderPage/>}
                    {typeEdit === 'slider' && <AdminBanerPage showmodal={funcVisibleModalBanerAdd} baners={baner.baners} funcDeleteBaner={funcDeleteBaner}/>}
                </Col>
            </Row>
            <AdminModalCategoryAdd show={isVisisbleModalCategoryAdd} onHide={()=>setIsVisibleModalCategoryAdd(false)} saveCategory={saveCategory} nameCategory={nameCategory} setNameCategory={setNameCategory}/>
            <AdminModalCategoryEdit show={isVisisbleModalCategoryEdit} onHide={()=>setIsVisibleModalCategoryEdit(false)} funcUpdateCategory={funcUpdateCategory} category={selectedCategory}/>
            <AdminModalBrandAdd show={isVisisbleModalBrandAdd} onHide={()=>setIsVisibleModalBrandAdd(false)} saveBrand={saveBrand} nameBrand={nameBrand} setNameBrand={setNameBrand}/>
            <AdminModalBrandEdit show={isVisisbleModalBrandEdit} onHide={()=>setIsVisibleModalBrandEdit(false)} funcUpdateBrand={funcUpdateBrand} brand={selectedBrand}/>
            <AdminModalComicAdd show={isVisisbleModalComicAdd} onHide={()=>setIsVisibleModalComicAdd(false)} saveComic={saveComic} nameComic={nameComic} setNameComic={setNameComic} descriptionComic={descriptionComic} setDescriptionComic={setDescriptionComic} priceComic={priceComic} setPriceComic={setPriceComic} fileComic={fileComic} setFileComic={setFileComic} categoryComic={categoryComic} setCategoryComic={setCategoryComic} brandComic={brandComic}  setBrandComic={setBrandComic} infoComic={infoComic} setInfoComic={setInfoComic}/>
            <AdminModalComicEdit show={isVisisbleModalComicEdit} onHide={()=>setIsVisibleModalComicEdit(false)} funcUpdateComic={funcUpdateComic} comicEdit={selectedComic}/>
            <AdminModalBanerAdd show={isVisisbleModalBanerAdd} onHide={()=>setIsVisibleModalBanerAdd(false)} saveBaner={saveBaner} fileBaner={fileBaner} setFileBaner={setFileBaner} linkBaner={linkBaner} setLinkBaner={setLinkBaner} descriptionBaner={descriptionBaner} setDescriptionBaner={setDescriptionBaner}/>
        </Container>

    )
})

export default AdminPage