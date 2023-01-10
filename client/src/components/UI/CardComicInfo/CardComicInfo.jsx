import React from 'react'
import {observer} from 'mobx-react-lite'
import classes from '../../../pages/styles/ComicOnePage.module.css'

const CardComicInfo = observer(({info})=>{
    return(
    <div className={classes.ComicInfo}>
        <h5>Детальная информация</h5>
        {
            info.map((i)=>{
                return(
                    <div key={i.id} className={classes.ComicInfoItem}>
                        <div className={classes.ComicInfoTitle}>{i.title}:</div>
                        <div className={classes.ComicInfoDescription}>{i.description}</div>
                    </div>
                )
            })
        }
    </div>
    )
})

export default CardComicInfo