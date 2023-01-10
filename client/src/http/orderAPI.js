import { $authHost } from "./index"

export const createOrder = async (order)=>{
    const {data} = await $authHost.post('api/order', order)
    return data
}

export const fetchOrders = async (page, limit = 2)=>{
    const {data} = await $authHost.get('api/order',  {params : {page, limit}})
    return data
}

export const fetchOrdersAdmin = async (page, limit = 2, query)=>{
    const {data} = await $authHost.get('api/order/alladmin',  {params : {page, limit, query}})
    return data
}

export const fetchOneOrder = async (id)=>{
    const {data} = await $authHost.get('api/order/' + id)
    return data
}

export const deleteOrder = async (id)=>{
    const {data} = await $authHost.delete('api/order/' + id)
    return data
}

export const addInfoOrder = async (id, info)=>{
    const {data} = await $authHost.post('api/order/' + id, info)
    return data
}

export const createOrderComics = async (orderComic)=>{
    const {data} = await $authHost.post('api/ordercomics', orderComic)
    return data
}

export const fetchOrderComics = async (orderId)=>{
    const {data} = await $authHost.get('api/ordercomics/' + orderId)
    return data
}