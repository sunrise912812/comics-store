import {$authHost} from './index.js'

export const fetchBasket = async ()=>{
    const {data} = await $authHost.get('api/basket')
    localStorage.setItem('basketid', data.id)
    return data
}

export const fectBasketCountComics = async ()=>{
    const {data} = await $authHost.get('api/basket/count')
    return data
}

export const addComicsInBasket = async (basketComic)=>{
    const {data} = await $authHost.post('api/basketcomics', basketComic)
    return data
}

export const fecthBasketComics = async (basketId)=>{
    const {data} = await $authHost.get('api/basketcomics', {params : {basketId}})
    return data
}

export const deleteBasketComic = async (id)=>{
    const {data} = await $authHost.delete('api/basketcomics/' + id)
    return data
}

export const updateBasketComics = async (id, countComics)=>{
    const {data} = await $authHost.put('api/basketcomics/' + id, countComics)
    return data
}