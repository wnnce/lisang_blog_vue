<script setup>
import {useDataStore} from "@/stores/dataStore";
import {onMounted, ref} from "vue";
import {_getSiteSetting, _updateSiteSetting} from "@/assets/js/api";
import {elSuccessNot} from "@/assets/js/util";
const isEditSetting = ref(false);
const store= useDataStore();
const setting = ref({})
const editSetting = ref({})
function showEditSetting(){
  isEditSetting.value = true;
  editSetting.value = JSON.parse(JSON.stringify(setting.value))
}
async function getSiteSetting(){
  setting.value = await _getSiteSetting();
}
async function updateSetting(){
  if(await _updateSiteSetting(editSetting.value)){
    elSuccessNot('', '更新成功')
    isEditSetting.value = false;
    await getSiteSetting();
    editSetting.value = {};
  }
}
function exit(){
  isEditSetting.value = false;
  editSetting.value = {};
}
const disableDate = (time) => {
  return time.getTime() > Date.now();
}
onMounted(() => {
  getSiteSetting()
})
</script>

<template>
  <el-dialog width="620" title="修改站点配置" v-model="isEditSetting" style="text-align: center">
    <el-form size="large" label-position="top">
      <el-form-item label="博客公告" required>
        <el-input v-model="editSetting.notice" maxlength="100" placeholder="博客公告，最长100个字" clearable
                  type="textarea" :autosize="{minRows: 3, maxRows: 4}" show-word-limit />
      </el-form-item>
      <el-form-item label="底栏自定义文字（支持HTML）">
        <el-input v-model="editSetting.explanation" maxlength="300" placeholder="底栏自定义文字，最长300个字" clearable
                  type="textarea" :autosize="{minRows: 3, maxRows: 10}" show-word-limit />
      </el-form-item>
      <el-form-item label="许可协议" required>
        <el-input v-model="editSetting.protocol" placeholder="文章许可协议" clearable />
      </el-form-item>
      <el-form-item label="网站开始时间" required>
        <el-date-picker v-model="editSetting.date" type="date" placeholder="选择日期" :disabled-date="disableDate"
                        format="YYYY/MM/DD" value-format="YYYY-MM-DD"/>
      </el-form-item>
      <el-form-item label="备案信息">
        <el-input v-model="editSetting.record" placeholder="网站备案信息，没有可不填..." clearable />
      </el-form-item>
      <el-button type="primary" @click="updateSetting" style="width: 120px">更 新</el-button>
      <el-button type="danger" @click="exit" style="width: 120px">取 消</el-button>
    </el-form>
  </el-dialog>
  <el-descriptions size="large" border :column="1">
    <template #extra>
      <el-button type="primary" size="large" @click="showEditSetting">修改设置</el-button>
    </template>
    <el-descriptions-item label="网站公告">
      {{setting.notice}}
    </el-descriptions-item>
    <el-descriptions-item label="备案信息">
      {{setting.record}}
    </el-descriptions-item>
    <el-descriptions-item label="网站开始时间">
      {{setting.date}}
    </el-descriptions-item>
    <el-descriptions-item label="许可协议">
      {{setting.protocol}}
    </el-descriptions-item>
    <el-descriptions-item label="底栏自定义消息">
      <span v-html="setting.explanation"></span>
    </el-descriptions-item>
    <el-descriptions-item label="最后更新时间">
      {{setting.updateTime}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<style scoped>

</style>