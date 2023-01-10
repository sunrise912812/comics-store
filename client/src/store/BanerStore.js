import { makeAutoObservable } from "mobx";

export default class BanerStore{
    constructor(){
        this._baners = []
        makeAutoObservable(this)
    }

    setBaners(baners){
        this._baners = baners
    }

    get baners(){
        return this._baners
    }
}