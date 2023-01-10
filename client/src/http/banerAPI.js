import { $host, $authHost } from "./index.js";

export const createBanerImg = async (banerImg)=>{
    const {data} = await $authHost.post('api/banerimg', banerImg)
    return data
}

export const fetchBanerImgs = async ()=>{
    const {data} = await $host.get('api/banerimg')
    return data
}

export const deleteBanerImg = async (id)=>{
    const {data} = await $authHost.delete('api/banerimg/' + id)
    return data
}