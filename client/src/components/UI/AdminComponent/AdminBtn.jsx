import React from 'react'
import { observer } from 'mobx-react-lite'
import { ButtonGroup, Button } from 'react-bootstrap'
import classes from './style/AdminPage.module.css'

const AdminBtn = observer(({typeEdit, setTypeEdit})=>{
    return(
        <div className={classes.MyAdminBtn}>
            <ButtonGroup size="lg" className="mb-2">
                <Button onClick={()=>setTypeEdit('category')} active={typeEdit === 'category' ? true : false} variant="success">Категории</Button>
                <Button onClick={()=>setTypeEdit('brand')} active={typeEdit === 'brand' ? true : false} variant="success">Брэнды</Button>
                <Button onClick={()=>setTypeEdit('comic')} active={typeEdit === 'comic' ? true : false} variant="success">Комиксы</Button>
                <Button onClick={()=>setTypeEdit('order')} active={typeEdit === 'order' ? true : false} variant="success">Заказы</Button>
                <Button onClick={()=>setTypeEdit('slider')} active={typeEdit === 'slider' ? true : false} variant="success">Слайдер</Button>
            </ButtonGroup>
        </div>
    )
})

export default AdminBtn