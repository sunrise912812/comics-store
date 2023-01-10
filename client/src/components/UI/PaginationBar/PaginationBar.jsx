import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import { Pagination } from 'react-bootstrap'

const PaginationBar = observer(()=>{
    const {comic} = useContext(Context)
    const pageCount = Math.ceil(comic.totalCount / comic.limit)
    let pages = []
    for(let i=0; i< pageCount; i++){
        pages.push(i+1)
    }
    return(
    <Pagination className="mt-5">
        {
            pages.map((p)=>{
                return(
                    <Pagination.Item key={p} active={comic.page === p} onClick={()=>comic.setPage(p)}>{p}</Pagination.Item>
                )
            })
        }
    </Pagination>
    )
})

export default PaginationBar