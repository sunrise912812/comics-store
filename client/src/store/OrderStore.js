import { makeAutoObservable } from "mobx";

export default class OrderStore{
    constructor(){
        this._orders = []
        this._orderComics = []
        this._selectedOrderComics = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setOrders(orders){
        this._orders = orders
    }
    setOrderComics(comics){
        this._orderComics = comics
    }
    setSelectedOrderComics(comics){
        this._selectedOrderComics = comics
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(limit){
        this._limit = limit
    }

    get orders(){
        return this._orders
    }
    get orderComics(){
        return this._orderComics
    }
    get selectedOrderComics(){
        return this._selectedOrderComics
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