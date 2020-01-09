<template>
  <div class="loginContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 登录表单 -->
    <ValidationObserver ref="myForm">
      <!-- 手机号 -->
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号">
          <i slot="left-icon" class="iconfont icon-xingmingyonghumingnicheng"></i>
        </van-field>
      </ValidationProvider>
      <!--/ 手机号 -->

      <!-- 验证码 -->
      <ValidationProvider name="验证码" rules="required|code">
        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码">
          <!-- 插入按钮 -->
          <i slot="left-icon" class="iconfont icon-icon--"></i>
          <!-- 倒计时 -->
          <van-count-down
            @finish="countDown=false"
            v-if="countDown"
            slot="button"
            :time="1000*60"
            format="ss 秒"
          />
          <van-button @click="sendSms" round slot="button" size="small" type="primary" v-else>发送验证码</van-button>
        </van-field>
      </ValidationProvider>
      <!-- /验证码 -->

      <div class="infoContainer">
        <van-button type="info" class="info" @click="clickLogin">登录</van-button>
      </div>
    </ValidationObserver>
    <!--/ 登录表单 -->
  </div>
</template>

<script>
import { login, sendSmsCode } from '@/api/User'
import { validate } from 'vee-validate'
export default {
  name: 'login',
  data () {
    return {
      countDown: false, // 倒计时
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {

    // 发送验证码
    async sendSms () {
      let { mobile } = this.user // 获取数据
      // 验证手机号
      let res = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // console.log(res)
      // 验证成功valid为true 失败为false
      if (!res.valid) { // 如果验证失败
      // 提示
        this.$toast(res.errors[0])
        return
      }
      try {
        this.countDown = true // 显示倒计时
        // 发送请求
        await sendSmsCode(mobile) // 发送验证码
      } catch (err) {
        this.countDown = false // 关闭倒计时
        // console.log(err.response)
        if (err.response.status === 429) {
          this.$toast('请勿频繁操作')
          return
        }
        this.$toast('发送失败')
      }
    },
    async clickLogin () {
      // 获取表单数据
      const user = this.user

      // 表单验证
      let success = await this.$refs.myForm.validate()
      if (!success) {
        // 如果验证不成功
        setTimeout(() => {
          // console.log(this.$refs.myForm.errors)
          let errorsForm = this.$refs.myForm.errors
          let item = Object.values(errorsForm).find(item => {
            return item[0]
          })
          this.$toast(item[0])
        }, 200)
        return
      }
      // loading动画
      this.$toast.loading({
        duration: 0, // 持续展示
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })

      // 提交请求 登录
      try {
        const res = await login(user)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
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
