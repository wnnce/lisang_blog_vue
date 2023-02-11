import {ElMessageBox, ElNotification,ElMessage} from 'element-plus';
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/notification/style/css'

const colors = ['#08ffc8', '#6b778d', '#dadada', '#204969', '#F38181', '#FCE38A', '#2BBBD8', '#1F6ED4', '#29aba4', '#354458', '#AEC5EB']
//为标签返回随机颜色
export function randomColor(){
    let num = Math.ceil(Math.random() * 10)
    return colors[num]
}
export function elMessageErr(message){
    ElMessage.error(message)
}
export function elSuccessNot(tittle, message){
    ElNotification({
        title: tittle,
        message: message,
        type: "success",
        duration: 2000
    })
}
export function elMessageNot(title, message){
    ElNotification({
        title: title,
        message: message,
        duration: 2000
    })
}
export function elErrorNot(tittle, message){
    ElNotification({
        title: tittle,
        message: message,
        type: "error",
        duration: 2000
    })
}
export function elMessageBox(title, message){
    return ElMessageBox.confirm(
        message, title,
        {
            confirmButtonText: '确 定',
            confirmButtonClass: 'box-button',
            cancelButtonText: '取 消',
            cancelButtonClass: 'box-button',
            center: true
        }
    )
}
//将list集合转为element的下拉选项
export function listForMatOptions(list){
    if (list){
        let options = [];
        list.forEach((item, index) => {
            let option = {value: item.id, label: item.name}
            options.push(option)
        })
        return options;
    }
}
//将list集合转为下拉选项的值 方便带入原值
export function listForMatOptionsItem(list){
    if (list){
        let values = [];
        list.forEach((item, index) => {
            let value = item.id;
            values.push(value);
        })
        return values;
    }
}
export function idArrayForMatObject(ids){
    if (ids){
        let idList = [];
        ids.forEach((item, index) => {
            let obj = {id: item};
            idList.push(obj);
        })
        return idList;
    }
}
export function handlerCopySuccess(){
    elSuccessNot('', '复制成功');
}
//判断Object对象是否为空
export function isObjectNull(obj){
    return obj === null || JSON.stringify(obj) === '{}';
}
//判断数组或集合是否为空
export function isArrayNull(array){
    return array === null || JSON.stringify(array) === '[]';
}
//格式化UA 只提取需要的值
export function uaHandler(ua){
    let start = ua.indexOf(";") + 1;
    let end = ua.indexOf(")");
    return ua.substring(start, end)
}

let currentHeight, timer;
//回到顶部方法
export function goTop(){
    timer = setInterval(runGoTop, 0.5)
}
function runGoTop(){
    currentHeight = document.documentElement.scrollTop || document.body.scrollTop;
    currentHeight -= 10;
    if (currentHeight > 0){
        window.scrollTo(0, currentHeight);
    }else{
        window.scrollTo(0, 0)
        clearInterval(timer)
    }
}

