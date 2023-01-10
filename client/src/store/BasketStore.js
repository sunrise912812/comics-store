import { makeAutoObservable } from 'mobx'

export default class BasketStore{
    constructor(){
        this._basket = {}
        this._basketComics = []
        this._countBasketComics = 0
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setBasket(basket){
        this._basket = basket
    }
    setBasketComics(basketComics){
        this._basketComics = basketComics
    }
    setCountBasketComics(count){
        this._countBasketComics = count
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(totalCount){
        this._totalCount = totalCount
    }
    setLimit(limit){
        this._limit = limit
    }

    get basket(){
        return this._basket
    }
    get basketComics(){
        return this._basketComics
    }
    get countBasketComics(){
        return this._countBasketComics
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}