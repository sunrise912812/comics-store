import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'react-bootstrap'
import classes from '../style/AdminPage.module.css'

const AdminCategoryList = observer(({categories, funcdeleteCategory, editCategoryShow})=>{
    return(
        <div className={classes.MyCategoryList}>
            {
                categories.map((c)=>{
                    return(
                        <Card key={c.id} className={classes.MyCategoryListItem}>
                            <div className={classes.MyCategoryListItemName}>{c.name}</div>
                            <div className={classes.MyCategoryListItemBtn}><Button onClick={()=>editCategoryShow(c)} variant="outline-primary">Изменить</Button>
                            <Button onClick={()=>funcdeleteCategory(c.id)} variant="outline-danger">Удалить</Button></div>
                        </Card>
                    )
                })
            }
        </div>
    )
})

export default AdminCategoryList