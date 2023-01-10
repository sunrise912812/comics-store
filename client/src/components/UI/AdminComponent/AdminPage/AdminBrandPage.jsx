import React from 'react'
import { observer } from 'mobx-react-lite'
import AdminBrandList from '../AdminComponentList/AdminBrandList'
import { Button } from 'react-bootstrap'

const AdminBrandPage = observer(({brands, showmodal, funcdeleteBrand, editBrandShow})=>{
    return(
        <div>
            <h5 style={{marginBottom:'20px'}}>Брэнды:</h5>
            <Button onClick={()=>showmodal(true)}>Добавить брэнд</Button>
            <AdminBrandList brands={brands} funcdeleteBrand={funcdeleteBrand} editBrandShow={editBrandShow}/>
        </div>
    )
})

export default AdminBrandPage