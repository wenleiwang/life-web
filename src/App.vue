<template>
  <div id="app">
    <!-- 这个很重要，切换窗口要靠他，没有他路径会换但页面不动 -->
    <router-view></router-view>
  </div>


</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
  border-top: solid 1px #f1f2f6;
}
</style>
