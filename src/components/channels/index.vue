<template>
  <div class="channelsContainer">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        @click="closeAndShow"
        type="danger"
        round
        plain
        size="mini"
      >{{ isclose? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" style="margin-top:10px">
      <van-grid-item @click="removeChannel(index)" v-for="(item,index) in channel" :key="item.id">
        <span slot="text" :class="{red:value === index}">{{item.name}}</span>
        <van-icon v-if="isclose && index!==0" color="red" slot="icon" name="close"></van-icon>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <van-grid :border="false" :gutter="10" style="margin-top:10px">
      <van-grid-item
        @click="addChannel(item)"
        :text="item.name"
        v-for="item in getRemain"
        :key="item.id"
      ></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels } from '@/api/channels'

export default {
  props: ['channel', 'value'], // channel 父组件传过来的我的频道列表
  name: 'channels',
  data () {
    return {
      isclose: false, // 显示/隐藏close图标
      allChannels: [] // 所有频道数据
    }
  },
  computed: {
    //   剩余频道 = 所有频道 - 我的频道
    //  遍历所有频道 在内部再遍历我的频道 比较我的频道中的频道id 是否跟当前项的id一样 一样则不要 不一样则添加
    getRemain () {
      let getRemainChannels = [] // 剩余频道
      this.allChannels.forEach(channel => {
        if (!this.channel.find(item => item.id === channel.id)) {
          getRemainChannels.push(channel)
        }
      })
      return getRemainChannels
    }
  },

  methods: {
    removeChannel (index) {
      // 如果处于编辑状态则点击谁移除谁
      if (this.isclose && index !== 0) {
        this.channel.splice(index, 1)
      } else {
        // 否则跳转到当前标签栏 将index给active
        this.$emit('input', index) // 监听父组件的事件 并传值 关闭弹层（弹层开关在父组件）
        this.$emit('closedla') // 注册一个事件 让父组件监听
      }
    },
    // 点击添加频道
    addChannel (item) {
      this.channel.push(item)
    },
    closeAndShow () {
      this.isclose = !this.isclose
      console.log(this.isclose)
    },
    // 获取所有频道
    async getAll () {
      const { data } = await getAllchannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  },

  created () {
    this.getAll()
  }
}
</script>

<style lang='less' scoped>
.channelsContainer {
  padding: 50px 10px;
  /deep/ .van-grid-item__content {
    font-size: 14px;
    position: relative;
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -12px;
      right: -10px;
      font-size: 18px;
      // color: red;
    }
  }
  /deep/ .red {
    color: red;
  }
}
</style>
