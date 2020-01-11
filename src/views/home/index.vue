<template>
  <div class="homeContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" fixed />

    <!-- 频道 -->
    <van-tabs v-model="active">
      <van-icon slot="nav-right" name="wap-nav" class="wap-nav" @click="ischannelPopup=true" />
      <van-tab v-for="item in channels" :key="item.id" :title="item.name" class="channelsList">
        <!-- 文章列表 -->
        <articleList class="articleList" :channel="item"></articleList>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="ischannelPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <!--弹出层内 子组件 -->
      <channelPopup :channel='channels'></channelPopup>
    </van-popup>
  </div>
</template>

<script>
import { userChannels } from '@/api/User'
import articleList from '../../components/articleList/index'
import channelPopup from '../../components/channels'
export default {
  name: 'home',
  data () {
    return {
      ischannelPopup: false, // 控制频道组件的开关
      active: 0, // 控制当前显示的标签栏
      channels: [] // 用户频道数据
    }
  },
  components: {
    articleList,
    channelPopup
  },
  methods: {
    // 获取频道列表
    async getChannels () {
      let { data } = await userChannels()
      console.log(data.data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.getChannels() // 获取用户频道数据
  }
}
</script>

<style lang='less' scoped>
.homeContainer {
  padding: 90px 0;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .wap-nav {
    position: fixed;
    right: 0;
    background-color: #fff;
    height: 38px;
    line-height: 38px;
  }
}
</style>
