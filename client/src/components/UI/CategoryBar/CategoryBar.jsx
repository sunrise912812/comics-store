import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import classes from './CategoryBar.module.css'

const CategoryBar = observer(()=>{
    const {comic} = useContext(Context)
    return(
        <div className={classes.MyCategoryBar}>
            <div className={classes.MyCategoryBarFirstDiv}></div>
            {comic.categories.map((c)=>{
                return(
                    <div onClick={()=>comic.setSelectedCategory(c)} key={c.id} className={comic.selectedCategory.id === c.id ? classes.MyCategoryBarItemActive : classes.MyCategoryBarItem}>{c.name}</div> 
                )
            })}
        </div>
    )
})

export default CategoryBar