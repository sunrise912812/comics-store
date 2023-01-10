import React from 'react'
import { observer } from 'mobx-react-lite'
import AdminCategoryList from '../AdminComponentList/AdminCategoryList'
import { Button } from 'react-bootstrap'

const AdminCategoryPage = observer(({categories, showmodal, funcdeleteCategory, editCategoryShow})=>{
    return(
        <div>
            <h5 style={{marginBottom:'20px'}}>Категории:</h5>
            <Button onClick={()=>showmodal(true)}>Добавить категорию</Button>
            <AdminCategoryList categories={categories} funcdeleteCategory={funcdeleteCategory} editCategoryShow={editCategoryShow}/>
        </div>
    )
})

export default AdminCategoryPage