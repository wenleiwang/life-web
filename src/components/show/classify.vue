<template>
  <div id="show">
    <vheader></vheader>
    <el-row type="flex" justify="center" class="activeDate">
      <el-col :span="16">
        <el-row>
          <el-col :span="4">
            <el-collapse v-model="activeClassify"  accordion>
              <el-collapse-item :title="item.classifyName" :name="item.classifyId+''" v-for="item in this.$store.state.listAritcleInClassify" :key="`classify-` + item.classifyId">
                <el-collapse accordion >
                  <h3 @click="seeArtcle(citem.articleId,item.classifyId)" :class="{'is-active-h3' : showH3 === citem.articleId+''}" v-for="citem in item.listArticle" :key="`article-` + citem.articleId">{{ citem.articleName }}</h3>
                  <h4 v-if="item.listArticle.length === 0">无数据</h4>
                </el-collapse>
              </el-collapse-item>

            </el-collapse>
          </el-col>
          <el-col :span="20">
            <artcle :classifyIdPorp="showH3+``"/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'
import artcleList from '../ArticleList/articleList'
import artcle from '../ArticleList/article'
import nodata from '../error/nodata'

import {apiUserListClassify} from '../../api'
export default {
  name: 'show',
  data(){
    return {
      activeClassify:'',
      showH3: '',
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
    nodata,
    artcle
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
      this.showH3 = this.$route.query.id;
      this.activeClassify = this.$route.query.classifyId
    },
    handleNodeClick(data) {
      console.log(data);
    },
    seeArtcle(val,classify){
      let id = val +''
      let classifyId = classify+''
      this.$router.push({name : 'classify' , query:{id,classifyId}});
    }
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
.activeDate{
  margin: 10px auto;
}
.onClassify{
  color: #2ed573;
}
.el-aside > ul > li > h3 > a:hover{
  color: #ff6348;
}

.el-collapse > .el-collapse-item > div > .el-collapse-item__header
{
  padding-left: 5px;
  border-radius: 2px;
}
.el-collapse > .el-collapse-item > div >.is-active{
  border-left: 2px solid #ff6348;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content {
  padding-bottom: 0;
  border-bottom: 0px;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content > .el-collapse > .el-collapse-item > div > .el-collapse-item__header{
  padding-left: 20px;
  border-radius: 2px;
  height: 30px;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content > .el-collapse > .el-collapse-item > div > .is-active{
  border-left: 2px solid #ffa502;
  color: #ffa502;
  height: 30px;
}

.is-expanded{
  color: #2ed573;
}

.el-collapse h3{
  width: 100%;
  /* background: red; */
  padding: 0px 0px 0px 20px;
}
.el-collapse h3:hover{
  cursor: pointer;
}
.el-collapse h4{
  width: 100%;
  /* background: red; */
  padding: 0px 0px 0px 20px;
  color: #ced6e0;
}

.el-collapse > .is-active-h3{
  border-left: 2px solid #ffa502;
  color: #ffa502;
  height: 30px;
}
</style>
