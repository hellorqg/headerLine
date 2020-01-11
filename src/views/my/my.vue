<template>
  <div class="homeContainer">
    <div class="header_ my">
      <!-- 上部分 -->
      <div>
        <van-image
          round
          fit="cover"
          width="80"
          height="80"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span>假装id</span>
        <van-button round size="small">编辑资料</van-button>
      </div>

      <!-- 四格 -->
      <van-grid class="grid_info">
        <van-grid-item >
          <span>123</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item >
          <span>123</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item >
          <span>123</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item >
          <span>123</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.header_ {
  width: 375px;
  height: 200px;
  background: url("../../assets/material/banner.png") no-repeat;
  background-size: cover;
}
</style>
