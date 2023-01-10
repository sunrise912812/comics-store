import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import { Dropdown } from 'react-bootstrap'

const BrandBar = observer(()=>{
    const {comic} = useContext(Context)
    return(
        <Dropdown>
      <Dropdown.Toggle variant="warning" id="dropdown-basic">
        {comic.selectedBrand.name || 'Издательство'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {
            comic.brands.map((b)=>{
                return(
                    <Dropdown.Item key={b.id} onClick={()=>comic.setSelectedBrand(b)}>{b.name}</Dropdown.Item>
                )
            })
        }
      </Dropdown.Menu>
    </Dropdown>
    )
})

export default BrandBar