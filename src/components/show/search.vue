<template>
  <div id="search">
    <vheader></vheader>
    <div class="top">
        <div class="content_body">
        <div class="content_list">
        <artcleList @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" :pageSize = "pageSize" :currentPage = "currentPage"/>
        </div>
    </div>
    </div>
    <vfooter></vfooter>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'

import Swiper from 'swiper'

import artcleList from '../ArticleList/articleList'
import {apiUserListClassify} from '../../api'
export default {
  name: 'show',
  data(){
    return {
      listClassify:[],
      pageSize:10,
      currentPage: 1,
      search:'',
      classifyId:0
    }
  },
  computed:{
    countTest () {
      return this.$store.state.name;
    },
    listArticleAddToStore(){
      this.get()
    },
    
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.listArticle()
    
  },
  mounted(){
    this.userListClassify()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'listArticleAddToStore'
  },
  components :{
    vheader,
    vfooter,
    artcleList
  },
  methods :{
   async userListClassify(){
      const result = await apiUserListClassify({});
      if(result.Result === 1){
        this.listClassify = result.Data
        return result.Data
      }
    },
    get(){
      this.$store.dispatch('listAritcle',{
        'search' : this.$route.query.search,
        'pageSize' : this.pageSize,
        'pageNum' : this.currentPage,
        'classifyId' : this.classifyId
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
    toClassify(){
      this.$router.push({ name: 'classify' })
    }
  
  }
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0px;
  height: 100%;
}
#search{
    height: 100%;
}
.content_body{
  margin: 5px auto;
  width: 900px;
  /* height: 100%; */
  padding-bottom:500px
}

.content_list{
  width: 900px;
  _height: 500px;
  box-sizing: border-box;
}

</style>
