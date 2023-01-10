import React, {useContext, useEffect} from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../index'
import { deleteBasketComic, updateBasketComics } from '../../../http/basketAPI'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CardBasketContentItem from './CardBasketContentItem'

const CardBasketContent = observer(({summOrder, checkFull})=>{
    const {basket} = useContext(Context)
    useEffect(()=>{
        let basketCom = []
        for(let c of basket.basketComics){
            basketCom.push({...c, checked : checkFull, summ : c.comic.price * c.countComics})
        }
        basket.setBasketComics(basketCom)
    },[])
    useEffect(()=>{
        let basketCom = []
        for(let c of basket.basketComics){
            basketCom.push({...c, checked : checkFull, summ : c.comic.price * c.countComics})
        }
        basket.setBasketComics(basketCom)
    },[checkFull])

    function updateCount(id, count){
        updateBasketComics(id, {countComics : count}).then(data=>{
            let comics = basket.basketComics.map((b)=>b.id === id ? {...b, countComics : count, summ : b.comic.price * count} : b)
            basket.setBasketComics(comics)
            summOrder(comics.filter((c)=>c.checked === true))
        })
        
    }
    function updateChecked(id, bool){
        let comics = basket.basketComics.map((b)=>b.id === id ? {...b, checked : bool} : b)
        basket.setBasketComics(comics)
        summOrder(comics.filter((c)=>c.checked === true))
    }
    function deleteRow(id){
        deleteBasketComic(id).then(data=>{
            basket.setCountBasketComics(data)
            basket.setBasketComics(basket.basketComics.filter((c)=>c.id !== id))
            summOrder(basket.basketComics.filter((c)=>c.checked === true))
        })
    }
    return(
        <div>
            <TransitionGroup>
            {
                basket.basketComics.map((c)=>{
                    return(
                <CSSTransition
                    key={c.id}
                    timeout={500}
                    className="MyBasketPageLeftContent">
                        <CardBasketContentItem comic={c} updateChecked={updateChecked} deleteRow={deleteRow} updateCount={updateCount}/>
                    </CSSTransition>
                    )
                })
            }
            </TransitionGroup>
        </div>
    )
})

export default CardBasketContent