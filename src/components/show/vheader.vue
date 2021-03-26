<template>
    <div class="black_colore" >
      <el-row justify="center" type="flex">
        <el-col :span="16">
          <el-row :gutter="20">
            <el-col  :xs="0" :sm="2" :md="2" :lg="3" :xl="3" @click="toIndex">
                <div class="harder_logo" >
                  <img src="../../assets/water_logo.png" alt="" style="height:4rem;margin: 0 auto;">
                </div>
              </el-col>
            <el-col :xs="16" :sm="16" :md="{span:16}" :lg="16" :xl="16">
              <el-row :gutter="20">
                <el-col :span="18">
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1" @click="toIndex">首页</el-menu-item>
                    <el-submenu index="2">
                      <template slot="title">我的工作台</template>
                      <el-menu-item index="2-1">杂谈</el-menu-item>
                      <el-menu-item index="2-2">高等数学</el-menu-item>
                      <el-menu-item index="2-3">历史</el-menu-item>
                      <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                      </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4">关于我</el-menu-item>
                  </el-menu>
                </el-col>
                <el-col :span="6" @click="toIndex"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- <div class="harder_body">
          <h3 class="harder_logo" @click="toIndex">Wenwen</h3>

          <ul>
              <li @click="toIndex">首页</li>
              <li @click="toClassify">分类</li>
              <li @click="toPigeonhole">归档</li>
              <li @click="toShowMe">关于我</li>
          </ul>

          <div class="harder_search">
            <form @submit.prevent="submit">
              <li><input type="text"  v-model="search"></li>
              <li><img src="@/assets/search.png" alt="" @click="submit"></li>
            </form>
          </div>
      </div> -->
    </div>
</template>

<script>
export default {
    name: 'admin-header',
    data: function(){
        return {
            count : 0,
            search:'',
            activeIndex: '1',
        }
    },
    methods:{
      toIndex(){
        this.$router.push({ path: "/" })
      },
      toClassify(){
        this.$router.push({ name: 'classify' })
      },
      toPigeonhole(){
        this.$router.push({ name: 'pigeonhole' })
      },
      toShowMe(){
        this.$router.push({ name: 'showMe' })
      },
      submit(){
        console.log('测试点击')
        let routeUrl = this.$router.resolve({
          path: "/search",
          query: {search:this.search}
        });
        window.open(routeUrl.href, '_blank');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>

.black_colore{
  /* background: #2c3e50; */
  background-color: #ffffff;
  border-bottom: 1px solid #dfe4ea;
  width: 100%;
  height: 4rem;
}

.el-row {    
  height: 100%;
}
.el-col {
  border-radius: 4px;
}
.el-menu{
  height: 4rem;
}
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

.harder_body{
  margin: 0px auto -357px;
  width: 70%;
  height: 100%;
  min-height: 100%;
}
.harder_logo{
  color: #70a1ff;
  font-family: Cambria Math;
  font-size: 32px;
  line-height: 35px;
  height: 4rem;
  width: 100%;
  font-weight: bold;
  float: left;
  text-shadow: 2px 2px 1px #000000;
  background-size:contain;
}

.harder_body > ul{
  margin: 0px;
}

.harder_body > ul > li{
  float: left;
  color: #F1F2F6;
  list-style: none;
  font-size: 18px;
  margin: 25px 20px;
}
.harder_body > ul > li:hover{
  cursor: pointer;
}
.harder_body > h3{
  cursor: pointer;
}

.harder_search{
  float: right;
  width: 383px;
  background-color: red;
  margin: 25px 0px 25px auto;
  border: 0px;
  border-radius: 5px;
  
}
.harder_search:hover{
  border: 1px solid #2ED573;
}

.harder_search > form > li{
  list-style: none;
  float: left;
  height: 23px;
}

.harder_search > form > li > input{
  width: 350px;
  height: 23px;
  border: 1px;
  padding: 0px;
  margin: 0px;
  border-radius: 3px 0px 0px 3px;
  /* 触发边框颜色 */
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
}

.harder_search > form > li > img{
  float: left;
  width: 23px;
  height: 23px;
  background-color: #FFFFFF;
  border-radius: 0px 3px 3px 0px;
}
.harder_search > form > li > img:hover{
  /* 鼠标变成小手 */
  cursor: pointer;
}
</style>