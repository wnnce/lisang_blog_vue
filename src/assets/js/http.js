import axios from "axios";
import to from 'await-to-js';

//封装axios的请求方式

export async function _get(url, data){
    const params = {
        url: url,
        method: 'get',
        params: data ? data : ''
    }
    const [err,res] = await to(axios(params))
    if (!err && res){
        return handlerRes(res)
    }else{
        console.log(err)
    }
}
export async function _post(url, data){
    const [err, res] = await to(axios.post(url, data))
    if (!err && res){
        return handlerRes(res)
    }else{
        console.log(err)
    }
}
export async function _put(url, data){
    const [err, res] = await to(axios.put(url, data))
    if (!err && res){
        return handlerRes(res)
    }else{
        console.log(err)
    }
}
export async function _delete(url, data){
    const params = {
        url: url,
        method: 'delete',
        data: data ? data : {}
    }
    const [err,res] = await to(axios(params))
    if (!err && res){
        return handlerRes(res)
    }else{
        console.log(err)
    }
}

//在code === 1时 直接返回后端发过来的数据 前端在调用接口时 只需要通过判断有没有返回值即可知道是否请求成功
function handlerRes(res){
    if (res.code === 1){
        return res.data;
    }
    return null;
}