<template>
  <div class="channelsContainer">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button type="danger" round plain size="mini">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" style="margin-top:10px">
      <van-grid-item :text="item.name" v-for="item in channel" :key="item.id" />
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <van-grid :gutter="10" style="margin-top:10px">
      <van-grid-item :text="item.name" v-for="item in getRemain" :key="item.id" />
    </van-grid>
  </div>
</template>

<script>
import { getAllchannels } from '@/api/channels'
export default {
  props: ['channel'], // channel 父组件传过来的我的频道列表
  name: 'channels',
  data () {
    return {
      allChannels: [] // 所有频道数据
    }
  },
  computed: {
    //   剩余频道 = 所有频道 - 我的频道
    //  遍历所有频道 在内部再遍历我的频道 比较我的频道中的频道id 是否跟当前项的id一样 一样则不要 不一样则添加
    getRemain () {
      let getRemainChannels = [] // 剩余频道
      this.allChannels.forEach(channel => {
        if (
          !this.channel.find(item => item.id === channel.id)
        ) {
          getRemainChannels.push(channel)
        }
      })
      return getRemainChannels
    }
  },

  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      const { data } = await getAllchannels()
      console.log(data)
      this.allChannels = data.data.channels
    }
  }
}
</script>

<style lang='less' scoped>
.channelsContainer {
  padding: 50px 10px;
}
</style>
