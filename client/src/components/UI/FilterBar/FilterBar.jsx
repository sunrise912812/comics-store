import React from 'react'
import { observer } from 'mobx-react-lite'
import BrandBar from '../BrandBar/BrandBar'
import SortedBar from '../SortedBar/SortedBar'
import classes from './FilterBar.module.css'

const FilterBar = observer(({sortFilter, setSortFilter})=>{
    return(
        <div className={classes.MyFilterBar}>
            <BrandBar/>
            <SortedBar sortFilter={sortFilter} setSortFilter={setSortFilter}/>
        </div>
    )
})

export default FilterBar