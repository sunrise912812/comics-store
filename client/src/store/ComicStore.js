import { makeAutoObservable } from 'mobx'

export default class ComicStore{
    constructor(){
        this._categories = []
        this._brands = []
        this._comics = []
        this._topComics = []
        this._selectedCategory = {}
        this._selectedBrand = {}
        this._selectedComic = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        this._topLimit = 5
        this._query = ''
        makeAutoObservable(this)
    }

    setCategories(categories){
        this._categories = categories
    }
    setBrands(brands){
        this._brands = brands
    }
    setComics(comics){
        this._comics = comics
    }
    setTopComics(comics){
        this._topComics = comics
    }
    setSelectedCategory(category){
        this.setPage(1)
        this._selectedCategory = category
    }
    setSelectedBrand(brand){
        this.setPage(1)
        this._selectedBrand = brand
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
    setTopLimit(limit){
        this._topLimit = limit
    }
    setSelectedComic(comic){
        this._selectedComic = comic
    }
    setQuery(query){
        this.setPage(1)
        this._query = query
    }

    get categories(){
        return this._categories
    }
    get brands(){
        return this._brands
    }
    get comics(){
        return this._comics
    }
    get topComics(){
        return this._topComics
    }
    get selectedCategory(){
        return this._selectedCategory
    }
    get selectedBrand(){
        return this._selectedBrand
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
    get topLimit(){
        return this._topLimit
    }
    get selectedComic(){
        return this._selectedComic
    }
    get query(){
        return this._query
    }
}