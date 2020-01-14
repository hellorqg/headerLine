<template>
  <div class="searchContainer">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        @focus="isShow=false"
        @search="onSearch"
        @cancel="$router.back()"
        background="#ccc"
      />
    </form>
    <!-- 搜索文章列表 -->
    <van-list
      v-if="isShow"
      v-model="loading"
      :finished="finished"
      finished-text="已加载全部数据"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
    <!-- /搜索文章列表 -->

    <!-- 联想搜索 -->
    <van-cell-group v-else-if="searchText">
      <van-cell title="联想搜索" icon="search"></van-cell>
      <van-cell title="搜索" icon="search"></van-cell>
    </van-cell-group>
    <!-- /联想搜索 -->

    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="delShow">
          <span slot="default">全部删除</span>
          <span @click="delShow=false" slot="default" style="margin-left:10px;">完成</span>
        </template>
        <van-icon
          v-if="!delShow"
          @click="delShow=true"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
      </van-cell>
      <van-cell title="单元格">
        <van-icon v-if="delShow" slot="right-icon" name="close" style="line-height: inherit;" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon v-if="delShow" slot="right-icon" name="close" style="line-height: inherit;" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      delShow: false, // 删除图标
      isShow: false, // 显示哪一部分功能
      searchText: '', // 输入框的文本
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    searchArticle () {},
    // 敲回车的时候触发搜索
    onSearch () {
      if (this.searchText) {
        this.isShow = true
      }
    },
    onCancel () {},
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
