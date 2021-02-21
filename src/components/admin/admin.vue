<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="15%" style="background-color: rgb(238, 241, 246)">
    <left-menu/>
  </el-aside>
  
  <el-container>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import leftMenu from './leftMenu'
export default {
    data() {
      return {
        currentTab: "AdminIndex"
      }
    },
    components:{
      leftMenu
    },
    computed: {
      currentTabComponent: function() {
        return "AdminIndex";
      }
    }
}
</script>

<style scoped>
.el-header {
background-color: #B3C0D1;
color: #333;
line-height: 60px;
}
  
.el-aside {
color: #333;
}

.harder_logo{
  color: #2ED573;
  font-family: Cambria Math;
  font-size: 32px;
  line-height: 32px;
  margin: 14px;
  font-weight: bold;
  float: left;
  text-shadow: 2px 2px 1px #000000;
}
</style>