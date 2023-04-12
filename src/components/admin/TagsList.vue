<script setup>
import {onMounted, ref} from "vue";
import {PlusOutlined} from "@ant-design/icons-vue";
import {ElMessageBox} from "element-plus";
import {elMessageBox, elMessageNot, elSuccessNot, isArrayNull} from "@/assets/js/util";
import {_addLabel, _deleteLabel, _getLabelList, _updateLabelStatus} from "@/assets/js/api";

const tagList = ref([]);

async function getTagList(){
  tagList.value = await _getLabelList(1);
}

function addTag(){
  ElMessageBox.prompt('请输入标签名称', '新增标签', {
    confirmButtonText: '添 加',
    cancelButtonText: '取 消',
    buttonSize: "default",
    inputValidator: (value) => {
      if(!value){
        return '标签名称不能为空';
      }
    }
  }).then(async ({value}) => {
    if (await _addLabel(value, 1)){
      elSuccessNot('', '添加成功' + value)
      await getTagList();
    }
  }).catch(() => {
    elMessageNot('', '取消添加')
  })
}
function updateTagStatus(tag){
  const newStatus = tag.status === 1 ? 0 : 1;
  const message = tag.status === 1 ? '禁用标签后，关联的所有文章都不会再显示该标签！' : '启用标签后，在文章中会显示该标签！'
  elMessageBox('修改标签状态', message).then(async () => {
    if (await _updateLabelStatus(tag.id, newStatus)){
      elSuccessNot('', tag.status === 1 ? '禁用成功' : '启用成功');
      tag.status = newStatus;
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}
function deleteTag(id){
  elMessageBox('删除标签', '确定删除该标签？').then(async () => {
    if (await _deleteLabel(id)){
      elSuccessNot('', '删除成功')
      await getTagList();
    }
  }).catch(() => {
    elMessageNot('', '操作取消')
  })
}onMounted(() => {
  getTagList();
})
</script>

<template>
  <div class="list-tool">
    <el-button type="primary" size="large" @click="addTag">
      <el-icon><plus-outlined class="el-icon--left"/></el-icon>
      新增标签
    </el-button>
  </div>
  <el-table :data="tagList" stripe style="width: 100%" v-loading="isArrayNull(tagList)">
    <el-table-column prop="name" label="标签名称"/>
    <el-table-column prop="articleNum" label="关联文章数量" align="center" />
    <el-table-column prop="createTime" label="创建时间" align="center" />
    <el-table-column label="状态" align="center">
      <template #default="scope">
        {{scope.row.status === 1 ? '启用' : '禁用'}}
      </template>
    </el-table-column>
    <el-table-column label="操作" width="240" align="center">
      <template #default="scope">
        <el-button type="warning" text @click="updateTagStatus(scope.row)">{{scope.row.status === 1 ? '禁用' : '启用'}}</el-button>
        <el-button type="danger" text @click="deleteTag(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>