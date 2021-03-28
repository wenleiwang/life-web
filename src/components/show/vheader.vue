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
            <el-col :xs="24" :sm="17" :md="{span:16}" :lg="16" :xl="16">
              <el-row :gutter="20">
                <el-col :span="23">
                  <el-menu :default-active="this.$store.state.activeHeaderIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1-">首页</el-menu-item>
                    <el-submenu index="2">
                      <template slot="title">我的工作台</template>
                      <el-submenu v-for="item in this.$store.state.listAritcleInClassify" :key="`classify-` + item.classifyId" :index="`2-`+item.classifyId+``">
                        <template slot="title">{{ item.classifyName }}</template>
                        <el-menu-item v-for="citem in item.listArticle" :key="`article-` + citem.articleId" :index="`2-`+citem.index">{{ citem.articleName }}</el-menu-item>
                        <el-menu-item v-if="item.listArticle.length === 0" index="2-0-0" disabled>无数据</el-menu-item>
                      </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3-" >点滴</el-menu-item>
                    <el-menu-item index="4-" disabled>关于我</el-menu-item>
                  </el-menu>
                </el-col>
                <el-col :span="1" @click="toIndex"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import {listArticleInClassify} from '../../api'
export default {
  
  name: 'admin-header',
  data: function(){
      return {
          count : 0,
          search:'',
          activeHeaderIndex: '1-',
          classifyList:[]
      }
  },
  methods:{
    // 获取分类的所有文章列表
    getClassifyArticleList(){
      this.$store.dispatch('listArticleInClassify');
    },
    toIndex(){
      this.$router.push({ path: "/" })
    },
    handleSelect(key, keyPath) {
      this.$store.dispatch('headerIndex',key);
      if(key.indexOf('1-') != -1){
        console.log('进入首页'+key)
        this.$router.push({ path: "/" })
      }else if(key.indexOf('2-') != -1){
        console.log('进入工作台'+key)
        let id = key.split('-')[2]
        let classifyId = key.split('-')[1]
        this.$router.push({name : 'classify' , query:{id,classifyId}});
      }else if(key.indexOf('3-') != -1){
        console.log('进入点滴'+key)
        this.$router.push({ name: 'pigeonhole' })
      }else if(key.indexOf('4-') != -1){
        this.$router.push({ name: 'showMe' })
      }
      
    }
  },
  beforeMount(){
    this.getClassifyArticleList()
  },
  mounted(){
    
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