<template>
  <div class="loginContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 登录表单 -->
    <van-cell-group>
      <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />

      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
        <!-- 插入按钮 -->
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <div class="infoContainer">
        <van-button type="info" class="info" @click="clickLogin">登录</van-button>
      </div>
    </van-cell-group>
    <!--/ 登录表单 -->
  </div>
</template>

<script>
import { login } from '@/api/User'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async clickLogin () {
      // 获取表单数据
      const user = this.user

      // 表单验证

      // loading动画
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 提交请求
      try {
        const res = await login(user)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.infoContainer {
  padding: 27px 16px;
  .info {
    width: 100%;
    background: #6db4fb;
  }
}
</style>
