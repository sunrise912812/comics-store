import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form } from 'react-bootstrap'
import AdminComicList from '../AdminComponentList/AdminComicList'
import PaginationBar from '../../PaginationBar/PaginationBar'
import SortedBar from '../../SortedBar/SortedBar'
import { Context } from '../../../../index'

const AdminComicPage = observer(({comics, showmodal, sortFilter, setSortFilter, funcdeleteComic, editComicShow})=>{
    const [query, setQuery] = useState('')
    const {comic} = useContext(Context)
    return(
        <div>
            <h5 style={{marginBottom:'20px'}}>Комиксы:</h5>
            <div style={{ display : 'flex', flexDirection : 'row', justifyContent : 'flex-start', alignItems : 'center' }}><Button onClick={()=>showmodal(true)} style={{ marginRight : '20px' }}>Добавить комикс</Button>
            <SortedBar sortFilter={sortFilter} setSortFilter={setSortFilter}/>
            <Form className="d-flex" style={{ marginLeft : '20px' }}>
            <Form.Control
              type="search"
              placeholder="Поиск по названию"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
            />
            <Button onClick={()=>comic.setQuery(query)} variant="warning">Найти</Button>
          </Form>
            </div>
            <AdminComicList comics={comics} funcdeleteComic={funcdeleteComic} editComicShow={editComicShow}/>
            <PaginationBar/>
        </div>
    )
})

export default AdminComicPage