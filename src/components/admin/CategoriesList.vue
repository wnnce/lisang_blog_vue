<script setup>
import {onMounted, ref} from "vue";
import {PlusOutlined} from "@ant-design/icons-vue";
import {ElMessageBox} from "element-plus";
import {elMessageBox, elMessageNot, elSuccessNot, isArrayNull} from "@/assets/js/util";
import {_deleteLabel, _addLabel, _getLabelList, _updateLabelStatus} from "@/assets/js/api";

const categoryList = ref([]);

async function getCategoryList(){
  categoryList.value = await _getLabelList(2);
}
function addCategory(){
  ElMessageBox.prompt('请输入分类名称', '新增分类', {
    confirmButtonText: '添 加',
    cancelButtonText: '取 消',
    buttonSize: "default",
    inputValidator: (value) => {
      if(!value){
        return '分类名称不能为空';
      }
    }
  }).then(async ({value}) => {
    if (await _addLabel(value, 2)){
      elSuccessNot('', '添加成功' + value)
      await getCategoryList();
    }
  }).catch(() => {
    elMessageNot('', '取消添加')
  })
}
function updateCategoryStatus(id, status){
  let message, newStatus;
  status === 1 ? newStatus = 0 : newStatus = 1;
  status === 1 ? message = '禁用分类后，关联的所有文章都不会再显示该分类！' : message = '启用分类后，在文章中会显示该分类！';
  elMessageBox('修改分类状态', message).then(async () => {
    if (await _updateLabelStatus(id, newStatus)){
      elSuccessNot('', status === 1 ? '禁用成功' : '启用成功')
      await getCategoryList();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
function deleteCategory(id){
  elMessageBox('删除分类', '确定删除该分类？').then(async () => {
    if (await _deleteLabel(id)){
      elSuccessNot('', '删除成功')
      await getCategoryList();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
onMounted(() => {
  getCategoryList();
})
</script>

<template>
  <div class="list-tool">
    <el-button type="primary" size="large" @click="addCategory">
      <el-icon><plus-outlined class="el-icon--left"/></el-icon>
      新增分类
    </el-button>
  </div>
  <el-table :data="categoryList" stripe style="width: 100%" v-loading="isArrayNull(categoryList)">
    <el-table-column prop="name" label="分类名称"/>
    <el-table-column prop="articleNum" label="关联文章数量" align="center" />
    <el-table-column prop="createTime" label="创建时间" align="center" />
    <el-table-column label="状态" align="center">
      <template #default="scope">
        {{scope.row.status === 1 ? '启用' : '禁用'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240" align="center">
      <template #default="scope">
        <el-button type="warning" text @click="updateCategoryStatus(scope.row.id, scope.row.status)">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
        <el-button type="danger" text @click="deleteCategory(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>