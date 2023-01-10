import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Button } from 'react-bootstrap'
import classes from '../style/AdminPage.module.css'

const AdminComicList = observer(({comics, funcdeleteComic, editComicShow})=>{
    const getMyDateCard = (date)=>{
        const myDate = new Date(date)
        return `${myDate.toLocaleDateString()}`
    }
    return(
        <div className={classes.AdminComicList}>
            {
                comics.map((c)=>{
                    return(
                        <Card key={c.id} className={classes.AdminComicListItem}>
                            <div className={classes.AdminComicListItemContentMain}><div className={classes.AdminComicListItemContentImg} style={{ backgroundImage : `url(${process.env.REACT_APP_API_URL + c.img})` }}></div><div className={classes.AdminComicListItemContentInfo}><h5>{c.name}</h5>
                            <div className={classes.AdminComicListItemContentInfoDate}>Добавлено: {getMyDateCard(c.createdAt)}</div>
                            <div className={classes.AdminComicListItemContentBtns}>
                            <Button onClick={()=>editComicShow(c)} variant="outline-primary">Изменить</Button>
                            <Button onClick={()=>funcdeleteComic(c.id)} variant="outline-danger">Удалить</Button></div>
                            </div></div>
                        </Card>
                    )
                })
            }
        </div>
    )
})

export default AdminComicList