<template>
  <div class="loginContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field required clearable label="手机号" placeholder="请输入手机号" />

      <van-field label="验证码" placeholder="请输入验证码" required>
        <!-- 插入按钮 -->
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <div class="infoContainer">
        <van-button type="info" class="info">登录</van-button>
      </div>
    </van-cell-group>
    <!--/ 登录表单 -->
  </div>
</template>

<script>
export default {
  name: 'login'
}
</script>

<style lang='less' scoped>
.infoContainer{
  padding: 27px 16px;
 .info{
   width: 100%;
   background: #6db4fb
 }
}
</style>
