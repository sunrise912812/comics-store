import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import classes from './ComicsList.module.css'
import { Context } from '../../../index'
import ComicItem from './ComicItem'

const ComicsList = observer(({addBasketComic})=>{
    const {comic} = useContext(Context)
    return(
        <div className={classes.MyComicsList}>
            {
                comic.comics.map((c)=>{
                    return(
                        <ComicItem key={c.id} comic={c} addBasketComic={addBasketComic}/>
                    )
                })
            }
        </div>
    )
})

export default ComicsList