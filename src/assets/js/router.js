import router from "@/router";

//封装路由方法
export async function goCategory(id){
    await router.push('/category/' + id)
}
export async function goTag(id){
    await router.push("/tag/" + id)
}
export async function goHome(){
    await router.push("/")
}
export async function goAbout(){
    await router.push("/about")
}
export async function goLinks(){
    await router.push("/links")
}
export async function goArticle(id){
    await router.push("/article/" + id)
}
export async function goAdmin(){
    await router.push("/cola/admin")
}
export async function goLogin(){
    await router.push("/cola/login")
}
export async function goBack(){
    await router.back();
}
export async function go404(){
    await router.push("/404")
}