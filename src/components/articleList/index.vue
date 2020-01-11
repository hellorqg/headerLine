<template>
  <div>
    <!-- 文章列表 -->
    <!-- 下拉 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.title" />
      </van-list>
    </van-pull-refresh>
    <!-- /下拉 -->
  </div>
</template>

<script>
import { getArticles } from '@/api/User'
export default {
  name: 'articleList',
  props: {
    // 频道对象，父组件提供
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timestamp: null, // 发送请求的时候的当前时间戳 第一次为null
      list: [], // 文章列表
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      let res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1 // 是否包含置顶 （不重要 默认包含）
      })
      console.log(res.data)
      // this.list = res.data.data
      let results = res.data.data.results
      this.list.push(...results) // 添加到数组中
      this.loading = false // 加载结束

      if (results.length) {
        this.timestamp = res.data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        let { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1 // 是否包含置顶 （不重要 默认包含）
        })
        console.log(data)

        this.list.unshift(...data.data.results)
        setTimeout(() => {
          this.$toast(`已加载${data.data.results.length}条最新数据`)
          this.isLoading = false
        }, 100)
      } catch (error) {
        this.$toast('刷新失败')
      }
    }
  },
  created () {}
}
</script>

<style lang='less' scoped>
</style>
