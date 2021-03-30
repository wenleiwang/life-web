<template>
<el-container style="height: 100%; border: 1px solid #eee">
  <el-aside width="15%" style="background-color: rgb(238, 241, 246)"  class="menu_admin">
    <left-menu/>
  </el-aside>
  
  <el-container>
    <el-main class="mainBody">
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
.mainBody{
  margin: 0px;
  padding: 0;
  overflow: visible;
}


 .menu_admin {
  width   : 100%;
  float   : left;
  border  : none;
  padding: 0px;
  }
  .scrollbar {
  width : 30px;
  height: 300px;
  margin: 0 auto;
  }
  .menu_admin::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  .menu_admin::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #535353;
  }
  .menu_admin::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #ededed;
  }
</style>