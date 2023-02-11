import {_delete, _get, _post, _put} from "@/assets/js/http";

export { login };

import axios from "axios";

//封装api接口 方便后期更改

export function _fileUpload(file){
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    return _post('/file/upload', formData)
}
export function _sendCode(){
    return _get('/user/sendCode')
}
function login(data){
    return axios.post('/user/login', data)
}
//后台个人信息页面接口
export function _getUserAll(){
    return _get('/user')
}
export function _updateUser(data){
    return _put('/user', data)
}
export function _updateUserPass(data){
    return _put('/user/repass', data)
}
export function _userLogOut(id){
    return _post('/user/logout', {id: id})
}
export function _getUserLinks(){
    return _get('/user/link')
}
export function _addUserLink(data){
    return _post('/user/link', data)
}
export function _updateUserLink(data){
    return _put('/user/link', data)
}
export function _updateUserLinkStatus(id, status){
    return _put('/user/link/status', {id: id, status: status})
}
export function _deleteUserLink(id){
    return _delete('/user/link/' + id)
}
//后台分类管理页面接口
export function _getCategoryList(){
    return _get('/category')
}
export function _addCategory(data){
    return _post('/category', data)
}
export function _updateCategoryStatus(id, status){
    return _put('/category', {id: id, status: status})
}
export function _deleteCategory(id){
    return _delete('/category/' + id)
}
//后台标签管理页面接口
export function _getTagList(){
    return _get('/tag')
}
export function _addTag(data){
    return _post('/tag', data)
}
export function _updateTagStatus(id, status){
    return _put('/tag', {id: id, status: status})
}
export function _deleteTag(id){
    return _delete('/tag/' + id)
}
//后台文章管理页面接口
export function _getArticleList(pageNum, pageSize, keyWord){
    return _get('/article', {page: pageNum, size: pageSize, key: keyWord})
}
export function _getArticleInfo(id){
    return _get('/article/' + id)
}
export function _saveArticle(data){
    return _post('/article', data)
}
export function _updateArticle(data){
    return _put('/article', data)
}
export function _updateArticleType(id, bl, status){
    return _put('/article/type', {id: id, isComment: bl, status: status})
}
export function _deleteArticle(id){
    return _delete('/article/' + id)
}
//Artalk评论管理接口
export function _getArtalkCommentList(pageNum, pageSize){
    return _get('/artalk/comments', {page: pageNum, size: pageSize})
}
export function _updateArtalkCommentType(id, isCollapsed, isPending, isPinned){
    return _put('/artalk/comments/type',
        {id: id, isCollapsed: isCollapsed, isPending: isPending, isPinned: isPinned})
}
export function _deleteArtalkComment(id){
    return _delete('/artalk/comments/' + id)
}
//Artalk评论页面管理接口
export function _getArtalkPageList(pageNum, pageSize){
    return _get('/artalk/pages', {page: pageNum, size: pageSize})
}
export function _updateArtalkPageType(id, adminOnly){
    return _put('/artalk/pages/type', {id: id, adminOnly: adminOnly})
}
export function _deleteArtalkPage(id){
    return _delete('/artalk/pages/' + id)
}
//Artalk评论用户管理接口
export function _getArtalkUserList(pageNum, pageSize){
    return _get('/artalk/users', {page: pageNum, size: pageSize})
}
export function _deleteArtalkUser(id){
    return _delete('/artalk/users/' + id)
}
//站点配置管理接口
export function _updateSiteSetting(data){
    return _put('/site/setting', data)
}
//关于我管理接口
export function _updateSiteAbout(value){
    return _put('/site/about', {about: value})
}
//友链管理接口
export function _getLinkListAll(){
    return _get('/links')
}
export function _saveLink(link){
    return _post('/links', link)
}
export function _updateLink(link){
    return _put('/links', link)
}
export function _updateLinkType(id, bl){
    return _put('/links/type', {id: id, isShow: bl})
}
export function _deleteLink(id){
    return _delete('/links/' + id)
}


export function _getSiteSetting(){
    return _get('/site/setting')
}
export function _getSiteAbout(){
    return _get('/site/about')
}
//前台接口
export function _getUserInfo(){
    return _get('/user/info')
}
export function _getUserLinkListByNormal(){
    return _get('/user/link/list')
}
export function _getCategoryListByNormal(){
    return _get('/category/list')
}
export function _getTagListByNormal(){
    return _get('/tag/list')
}
export function _getArticleListByNormal(pageNum){
    return _get('/article/list', {page: pageNum})
}
export function _getArticleTop(){
    return _get('/article/top')
}
export function _getArticleInfoByNormal(id){
    return _get('/article/info/' + id)
}
export function _searchArticleTitle(title){
    return _get('/article/search', {title: title})
}
export function _getArticleListByTagId(id, pageNum){
    return _get('/article/list/tag', {id: id, page: pageNum})
}
export function _getArticleListByCategoryId(id, pageNum){
    return _get('/article/list/category', {id: id, page: pageNum})
}
export function _getCategoryInfo(id){
    return _get('/category/info/' + id)
}
export function _getTagInfo(id){
    return _get('/tag/info/' + id,)
}
export function _getLinkList(){
    return _get('/links/list')
}