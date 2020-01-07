<template>
  <div id="app">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-icon name="chat-o" info="9" />
    <router-view></router-view>
    <!-- 容器 -->
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
