import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../../index'
import { fetchBanerImgs } from '../../../../http/banerAPI'
import { Spinner, Button } from 'react-bootstrap'
import AdminBanerList from '../AdminComponentList/AdminBanerList'

const AdminBanerPage = observer(({showmodal, baners, funcDeleteBaner})=>{
    return(
        <div>
            <h5 style={{marginBottom:'20px'}}>Банер:</h5>
            <Button onClick={()=>showmodal(true)}>Добавить изображение</Button>
            <AdminBanerList banerImgs={baners} funcDeleteBaner={funcDeleteBaner}/>
        </div>
    )
})

export default AdminBanerPage