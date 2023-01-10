import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Dropdown } from 'react-bootstrap'
import { Context } from '../../../index'
import classes from '../FilterBar/FilterBar.module.css'

const SortedBar = observer(({sortFilter, setSortFilter})=>{
    const {comic} = useContext(Context)
    const sortType = [{id : 1, value : 'name', name : 'По названию'},
    {id : 2, value : 'price', name : 'По цене увеличению'},
    {id : 3, value : 'price_desc', name : 'По цене уменьшению'},
    {id : 4, value : 'raiting', name : 'По рейтингу увеличению'},
    {id : 5, value : 'raiting_desc', name : 'По рейтингу уменьшению'},
    {id : 6, value : 'createdAt_desc', name : 'По дате добавления (новые)'}, 
    {id : 7, value : 'createdAt', name : 'По дате добавления (старые)'}           
]

    const sort = sortType.find(s => s.value === sortFilter)
    let sortName = ''
    if(sort){
        sortName = sort.name
    }

    function funcNewSort(value){
        comic.setPage(1)
        setSortFilter(value)   
    }

    return(
        <Dropdown className={classes.MyFilterBarSort}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          {sortName || 'Сортировка'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {
              sortType.map((s)=>{
                  return(
                      <Dropdown.Item key={s.id} onClick={()=>funcNewSort(s.value)}>{s.name}</Dropdown.Item>
                  )
              })
          }
        </Dropdown.Menu>
      </Dropdown>
    )
})

export default SortedBar