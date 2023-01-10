import { $host, $authHost } from "./index.js";

export const createCategory = async (category)=>{
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async ()=>{
    const {data} = await $host.get('api/category')
    return data
}

export const deleteCategory = async (id)=>{
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}

export const updateCategory = async (id, category)=>{
    const {data} = await $authHost.put('api/category/' + id, category)
    return data
}

export const createBrand = async (brand)=>{
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async ()=>{
    const {data} = await $host.get('api/brand')
    return data
}

export const deleteBrand = async (id)=>{
    const {data} = await $authHost.delete('api/brand/' + id)
    return data
}

export const updateBrand = async (id, brand)=>{
    const {data} = await $authHost.put('api/brand/' + id, brand)
    return data
}

export const createComic = async (comic)=>{
    const {data} = await $authHost.post('api/comics', comic)
    return data
}

export const fetchComics = async (categoryId, brandId, page, limit = 2, sort, query)=>{
    const {data} = await $host.get('api/comics', {params : {categoryId, brandId, page, limit, sort, query}})
    return data
}

export const fecthComicsTop = async (limit = 5)=>{
    const {data} = await $host.get('api/comics/top', {params : {limit}})
    return data
}

export const fetchOneComic = async (id)=>{
    const {data} = await $host.get('api/comics/' + id)
    return data
}

export const deleteComic = async (id)=>{
    const {data} = await $authHost.delete('api/comics/' + id)
    return data
}

export const updateComic = async (id, comic)=>{
    const {data} = await $authHost.put('api/comics/' + id, comic)
    return data
}

export const addCommentComic = async(comment)=>{
    const {data} = await $authHost.post('api/raiting', comment)
    return data
}