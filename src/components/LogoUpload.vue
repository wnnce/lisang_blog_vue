<!--图片上传组件-->
<script setup>
import { ElMessage } from 'element-plus'
import { PlusOutlined } from "@ant-design/icons-vue";
import { _fileUpload } from "@/assets/js/api";
defineProps({
  imageUrl:{
    type: String
  },
  size: {
    type: Array,
    default: () => ['80px', '80px']
  }
})
const emit = defineEmits(['update:imageUrl'])
async function logoUpload(param){
  let url = await _fileUpload(param.file)
  if (url){
    emit('update:imageUrl', url)
  }
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('图片格式必须为JPG或者PNG！')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片最大2MB！')
    return false
  }
  return true
}
</script>

<template>
  <el-upload
      class="avatar-uploader"
      :style="{width: size[0], height: size[1]}"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :http-request="logoUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="{width: size[0], height: size[1]}" alt="img"/>
    <el-icon v-else class="avatar-uploader-icon" :style="{width: size[0], height: size[1]}"><plus-outlined /></el-icon>
  </el-upload>
</template>

<style scoped>
.avatar-uploader .avatar {
  display: block;
  object-fit: cover;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}
</style>