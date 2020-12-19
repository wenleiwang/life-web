<template>
  <div id="app">
    <!-- 这个很重要，切换窗口要靠他，没有他路径会换但页面不动 -->
    <router-view></router-view>
  </div>


</template>

<script>
import vheader from '@/components/vheader'
import vfooter from '@/components/vfooter'
export default {
  name: 'App',
  components :{
    vheader,
    vfooter
  }
}
</script>

<style>
</style>
