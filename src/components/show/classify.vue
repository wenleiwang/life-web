<template>
  <div id="show">
    <el-container>
      <el-header  height="70px">
        <vheader></vheader>
      </el-header>
      <el-container class="body-container">
        <el-aside width="25%">
          <ul>
            <li v-for="item in listClassify" :key="item.classifyId">
              <h3><a href="javascript:;" @click="get(item.classifyId)" :class="{onClassify: classifyId == item.classifyId}">{{ item.classifyName }}</a></h3>
            </li>
          </ul>
        </el-aside>
        <el-main>
          <artcleList  v-if="this.$store.state.listAritcle.length  > 0" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" :pageSize = "pageSize" :currentPage = "currentPage"/>
          <nodata v-else/>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'
import artcleList from '../ArticleList/articleList'
import nodata from '../error/nodata'

import {apiUserListClassify} from '../../api'
export default {
  name: 'show',
  data(){
    return {
      pageSize:20,
      currentPage: 1,
      classifyId:0,
      search:'',
      listClassify:[
        {'classifyId':1,'classifyName':'测试'}

      ],
    }
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.userListClassify()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'userListClassify'
  },
  computed:{
    
  },
  components :{
    vheader,
    vfooter,
    artcleList,
    nodata
  },
  methods :{
    get(classifyId){
      this.classifyId = classifyId;
      this.$store.dispatch('listAritcle',{
        'search' : this.search,
        'pageSize' : this.pageSize,
        'pageNum' : this.currentPage,
        'classifyId' : classifyId
      });
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.get()
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.get()
    },
    async userListClassify(){
      const result = await apiUserListClassify({});
      if(result.Result === 1){
        this.listClassify = result.Data
      }else{
        this.$message.error('请求失败！');
      }
    },
  }
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0px;
  height: 100%;
}
.el-container{
  width: 100%;
  margin: 0;
  padding: 0;
  height: 100%;
}

#show{
  height: 100%;
}

.body-container{
  width: 900px;
  margin: 72px auto 10px auto;

}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 40px;
  height: 100%;
}

.el-aside > ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
.el-aside > ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px #747d8c;
  background   : #535353;
  }
.el-aside > ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background   : #ededed;
  }

.el-aside > ul{
  position: fixed;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  width: 230px;
  background-color: #D3DCE6;
  height: 100%;
}
.el-aside > ul > li{
  width: 100%;
  list-style: none;
  flex-shrink: 0;
}
.onClassify{
  color: #2ed573;
}
.el-aside > ul > li > h3 > a:hover{
  color: #ff6348;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 0;
  padding-top: 10px;
  padding-left: 10px;
  height: 100%;
  overflow:inherit;
}

.el-header {
  padding: 0;
  position: fixed;
  width: 100%;
  z-index: 99;
}
  

</style>
