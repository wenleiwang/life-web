<template>
  <div id="app">
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
