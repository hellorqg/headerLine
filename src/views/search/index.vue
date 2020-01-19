<template>
  <div class="searchContainer">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        @input="searchAssociate"
        @focus="isShow=false"
        @search="onSearch"
        @cancel="$router.back()"
        background="#ccc"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isShow" :q="searchText"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想搜索 -->
    <van-cell-group v-else-if="searchText">
      <van-cell v-for="(item,index) in associateList" :key="index" icon="search">
        <div slot="title" v-html="higtLight(item)"></div>
      </van-cell>
      <!-- <van-cell title="搜索" icon="search"></van-cell> -->
    </van-cell-group>
    <!-- /联想搜索 -->

    <!-- 搜索历史 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="delShow">
          <span slot="default" @click="searchHistoryList=[]">全部删除</span>
          <span @click="delShow=false" slot="default" style="margin-left:10px;">完成</span>
        </template>

        <!-- 垃圾桶图标 -->
        <van-icon
          v-if="!delShow"
          @click="delShow=true"
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
        />
        <!-- 垃圾桶图标 -->

      </van-cell>
      <van-cell :title="item" v-for="(item,index) in searchHistoryList" :key="index">
        <van-icon @click="delHistory(index)" v-if="delShow" slot="right-icon" name="close" style="line-height: inherit;" />
      </van-cell>
      <!-- <van-cell title="单元格">
        <van-icon v-if="delShow" slot="right-icon" name="close" style="line-height: inherit;" />
      </van-cell>-->
    </van-cell-group>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import { getItem, setItem } from '@/Utils/storage'
import { debounce } from 'lodash' // 引入防抖
import searchResult from './search-result' // 引入搜索结果组件
import { suggestionSearch } from '@/api/search' // 引入方法
export default {
  name: 'search',
  data () {
    return {
      searchText: '', // 输入框的文本
      delShow: false, // 删除图标
      isShow: false, // 显示哪一部分功能
      associateList: [], // 联想搜索列表
      searchHistoryList: getItem('search-history') || []// 搜索历史列表
    }
  },
  methods: {
    // 删除历史记录
    delHistory (index) {
      this.searchHistoryList.splice(index, 1)
    },
    // 高亮
    higtLight (str) {
      const reg = new RegExp(this.searchText, 'ig') // 第一个参数为字符串 第二个参数为正则规则
      return str.replace(
        reg,
        `<span style='color:red;'>${this.searchText}</span>`
      )
    },

    // 联想搜索
    searchAssociate: debounce(async function () {
      if (this.searchText) {
        const { data } = await suggestionSearch(this.searchText)
        console.log(data.data)
        this.associateList = data.data.options
      }
    }, 200),
    // async searchAssociate () {
    //   if (this.searchText) {
    //     const { data } = await suggestionSearch(this.searchText)
    //     console.log(data.data)
    //     this.associateList = data.data.options
    //   }
    // },

    // 敲回车的时候触发搜索
    async onSearch () {
      if (this.searchText) {
        this.isShow = true
        // 判断搜索的是否在数组中 如果在删除并添加到第一个
        let index = this.searchHistoryList.indexOf(this.searchText) // 当前搜索项在数组中的下标或者-1
        if (index !== -1) {
          this.searchHistoryList.splice(index, 1)
          // 添加到历史记录
        }
        this.searchHistoryList.unshift(this.searchText)
        // 保存到本地 如果本地有历史记录用本地的，如果没有
      }
    },
    onCancel () {}
  },
  components: {
    searchResult
  },
  watch: {
    searchHistoryList (newVal) {
      setItem('search-history', newVal)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
