<!--
 * @Description: 
 * @Autor: 孙婧雯
 * @Date: 2021-08-28 11:01:38
 * @LastEditors: 孙婧雯
 * @LastEditTime: 2021-08-29 14:24:25
-->
<template>
  <div class="upper-title-box">
    <div class="title-box">
      <h3>{{ title }}</h3>
      <div class="text">{{ text }}</div>
    </div>
    <div class="button-box d-flex">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpperTitle",
  props: {
    title: {
      type: String,
      default: "青盟",
    },
    text: {
      type: String,
      default: "项目平台",
    },
  },
};
</script>

<style lang="scss" scoped>
.upper-title-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>