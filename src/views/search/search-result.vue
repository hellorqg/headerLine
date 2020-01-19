<template>
  <!-- 搜索文章列表 -->
  <van-list v-model="loading" :finished="finished" finished-text="已加载全部数据" @load="onLoad">
    <van-cell v-for="item in list" :key="item.id" :title="item.title" />
  </van-list>
  <!-- /搜索文章列表 -->
</template>

<script>
import { getSearch } from '@/api/search'

export default {
  props: ['q'],
  name: 'searchResult',
  data () {
    return {
      list: [], // 搜索结果列表
      loading: false,
      finished: false,
      page: 1,
      per_page: 20
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 1 请求获取数据
      let { data } = await getSearch({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      console.log(data.data)
      const { results } = data.data
      // 2 将数据添加到列表中
      this.list.push(...results)
      // 3 关闭加载状态
      this.loading = false
      // 4 判断数据是否加载完毕
      if (results.length) {
        this.page++
      } else {
        this.finished = true // 设置结束加载
        this.$toast('已全部加载')
      }
    }
  }
}
</script>

<style>
</style>
