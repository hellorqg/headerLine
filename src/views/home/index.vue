<template>
  <div class="homeContainer">
    <!-- 导航栏 -->
    <van-nav-bar title="标题" />

    <!-- 频道 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in channels" :key="item.id" :title="item.name" class="channelsList">
        <!-- 文章列表 -->
        <articleList class="articleList" :channel='item'></articleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { userChannels } from '@/api/User'
import articleList from '../../components/articleList/index'
export default {
  data () {
    return {
      name: 'home',
      active: 0,
      channels: [] // 用户频道数据
    }
  },
  components: {
    articleList
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

</style>
