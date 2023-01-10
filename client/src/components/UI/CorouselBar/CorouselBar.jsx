import React, {useContext} from 'react'
import { observer } from 'mobx-react-lite'
import { Carousel, Button } from 'react-bootstrap'
import { Context } from '../../../index'
import { useNavigate } from 'react-router-dom'
import { SHOP_ROUTE } from '../../../utils/consts'

const CarouselBar = observer(()=>{
  const {baner, comic} = useContext(Context)
  const history = useNavigate()

  function getlink(link){
    if(link === SHOP_ROUTE){
      comic.setQuery('')
    }
    history(link)
  }
    return(
        <Carousel fade>
          {
            baner.baners.map((b)=>{
              return(
                <Carousel.Item key={b.id}>
                <img
                  className="d-block w-100"
                  src={process.env.REACT_APP_API_URL + b.img}
                />
                <Carousel.Caption>
                  <h3>{b.description}</h3>
                  <p><Button variant="primary" onClick={()=>getlink(b.link)}>Подробнее</Button></p>
                </Carousel.Caption>
              </Carousel.Item>
              )
            })
          }
      </Carousel>
    )
})

export default CarouselBar