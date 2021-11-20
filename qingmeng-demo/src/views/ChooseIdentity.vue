<!--
 * @Description: 注册（1:发布者，2:开发者）
 * @Autor: 孙婧雯
 * @Date: 2021-08-24 10:13:55
 * @LastEditors: 单伟
 * @LastEditTime: 2021-11-08 19:07:40
-->
<template>
  <div class="choose-bg">
    <!-- Login Form -->
    <div class="choose-identity row">
      <div class="col-lg-6 d-flex justify-content-center">
        <router-link to="/register/1" class="identity employer "><img src="../assets/images/publisher.png" alt=""></router-link>
      </div>
      <div class="col-lg-6 d-flex justify-content-center">
        <router-link to="/register/2" class="identity employer "><img src="../assets/images/developer.png" alt=""></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.choose-bg {
  background: url(../assets/images/background/choose-identity.png);
  background-size: cover;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 50px;
  overflow: auto;
}
.choose-identity {
  display: flex;
  width: 70%;
}
.identity {
}
</style>