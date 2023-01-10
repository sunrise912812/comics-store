import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card } from 'react-bootstrap'
import classes from '../style/AdminPage.module.css'

const AdminBanerList = observer(({banerImgs, funcDeleteBaner})=>{
    return(
        <div className={classes.MyBanerList}>
            {
                banerImgs.map((b, index)=>{
                    return(
                        <Card key={b.id} className={classes.MyBanerListItem}>
                            <div className={classes.MyBanerListItemHeader}>Изображение №{index + 1}</div>
                            <div className={classes.MyBanerListItemImgDiv}><img className={classes.MyBanerListItemImg} src={process.env.REACT_APP_API_URL + b.img}/><div onClick={()=>funcDeleteBaner(b.id)} className={classes.MyBanerListItemImgDel}>X</div></div>
                            <div className={classes.MyBanerListItemLink}>Ссылка: <span>{b.link}</span></div>
                            <div className={classes.MyBanerListItemDescription}>Описание: <span>{b.description}</span></div>
                        </Card>
                    )
                })
            }
        </div>
    )
})

export default AdminBanerList