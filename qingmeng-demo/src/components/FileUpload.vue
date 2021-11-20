<!--
 * @Description: 文件上传组件，基于 element ui 二次封装
 * @Autor: 单伟
-->
<template>
  <el-upload
      list-type="picture-card"
      class="upload-demo"
      :headers="headers"
      :action="action"
      :data="extraParams"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{ file }">
      <img class="el-upload-list__item-thumbnail" :src="file.thumbnailUrl" alt=""/>
      <div class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview">
          <a target="_blank" class="el-icon-view file-name" :href="file.downloadUrl"></a>
        </span>
        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </div>
    </div>
  </el-upload>
</template>

<script>
import {getToken} from "@/utils/auth";

export default {
  name: "FileUpload",
  data() {
    return {
      fileList: [],
    }
  },
  props: {
    action: { //必选参数，上传的地址
      type: String,
      require: true,
      default: ""
    },
    extraParams: { //上传文件时传递的额外参数
      type: Object,
      default() {
        return {}
      }
    },
    showFileList: { //上传文件列表，用于文件回显(预览)
      type: Array,
      default() {
        return []
      }
    },
    uploadFileList: { //需要上传到 Server 端的文件列表信息，如果 asyncUpload 为 false，这个参数必须得传
      type: Array,
      default() {
        return []
      }
    },
    onRemove: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
  },
  computed: {
    headers() { //TODO: 要封装出去
      let tokenInfo = getToken();
      return {Authorization: tokenInfo.token};
    }
  },
  watch: { //监听父组件传递过来的 showFileList，之所以用 watch 而不是 computed，原因是数组可能是异步的
    showFileList: {
      handler(newVal) {
        this.fileList = newVal.map((item) => {
          return this.handleFileUrl(item);
        });
      },
      immediate: true
    }
  },
  methods: {
    handleFileUrl(file) {
      //TODO: 上传文件类型要封装出去
      const fileTypes = ["pdf", "doc", "docx", "xls", "xlsx"]; //支持的上传文件类型
      let fileExtension = file.fileName.split(".")[1]; //上传的文件扩展名
      file.thumbnailUrl = this.getAbsPath(file.fileUrl); //获取上传文件在 Server 端的绝对路径
      if (fileTypes.includes(fileExtension)) { //判断上传的文件是否在规定的上传文件类型范围中
        file.thumbnailUrl = require(`@/assets/images/workbench/${fileExtension}.svg`); //加载对应文件类型的图标
      }
      file.downloadUrl = this.getAbsPath(file.fileUrl);
      return file;
    },
    handleChange(file) {
      file.url = require('@/assets/images/loading.gif'); //文件上传开始前先加载loading小图标
      // this.$emit('on-change', file, fileList); //如果父组件也传递了 on-change 事件，则在此处进行回调
    },
    handleSuccess(response/*, file, fileList*/) {
      if (response.code === 2200) {
        let uploadedFile = this.handleFileUrl(response.data);
        this.fileList.push(uploadedFile); //刷新回显文件列表
        this.$emit('on-success', uploadedFile);
      } else {
        this.$message.error("上传图片失败😭");
      }
    },
    handleError(err, file, fileList) {
      this.$message.error("上传图片失败😭");
      this.$emit('on-error', err, file, fileList)
    },
    handleRemove(file) {
      let params = {
        filePath: file.fileUrl
      };
      let projectId = this.extraParams && this.extraParams.projectId;
      if (projectId) {
        params.projectId = projectId
      }
      this.openMessageBox({
        title: "提示",
        content: "确定删除文件吗",
        handleConfirm: () => {
          this.axios({
            url: "/project/deleteProjectFiles",
            method: 'POST',
            params
          }).then(() => {
            this.fileList.splice(this.fileList.findIndex(elem => elem.uid === file.uid), 1)
            this.$emit('on-remove', file)
          });
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>

.el-upload-list__item-actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>