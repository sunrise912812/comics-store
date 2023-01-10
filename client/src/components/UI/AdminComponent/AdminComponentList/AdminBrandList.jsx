import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'react-bootstrap'
import classes from '../style/AdminPage.module.css'

const AdminBrandList = observer(({brands, funcdeleteBrand, editBrandShow})=>{
    return(
        <div className={classes.MyCategoryList}>
            {
                brands.map((b)=>{
                    return(
                        <Card key={b.id} className={classes.MyCategoryListItem}>
                            <div className={classes.MyCategoryListItemName}>{b.name}</div>
                            <div className={classes.MyCategoryListItemBtn}><Button onClick={()=>editBrandShow(b)} variant="outline-primary">Изменить</Button>
                            <Button onClick={()=>funcdeleteBrand(b.id)} variant="outline-danger">Удалить</Button></div>
                        </Card>
                    )
                })
            }
        </div>
    )
})

export default AdminBrandList