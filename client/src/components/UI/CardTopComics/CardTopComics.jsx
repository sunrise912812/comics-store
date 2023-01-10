import React, {useContext} from 'react'
import classes from './CardTopComics.module.css'
import { Context } from '../../../index'
import CardTopComicsItem from './CardTopComicsItem'
import { observer } from 'mobx-react-lite'

const CardTopComics = observer(({addBasketComic})=>{
    const {comic} = useContext(Context)
    return(
    <div className={classes.MyCardTopComics}>
        {comic.topComics.map((c)=>{
            return(
                <CardTopComicsItem key={c.id} comic={c} addBasketComic={addBasketComic}/>
            )
        })} 
    </div>
    )
})

export default CardTopComics