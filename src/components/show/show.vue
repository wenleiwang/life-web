<template>
  <div id="show">
    <vheader></vheader>
    <el-row type="flex" justify="center" class="el-row-body">
      <el-col :span="16">
        <el-row type="file" justify="center">
          <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
            <template>
              <el-carousel indicator-position="outside" height="500px">
                <el-carousel-item v-for="item in imagesbox" :key="item.id">
                  <el-image
                    style="width: 100%;"
                    :src="item.idView"
                    fit="contain"></el-image>
                </el-carousel-item>
              </el-carousel>
            </template>
          </el-col>
        </el-row>
        
        <el-row type="flex" :gutter="15" justify="center">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-row :gutter="20">
              <el-col  :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
                <!-- 文章列表 -->
                <artcleList @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" :pageSize = "pageSize" :currentPage = "currentPage"/>
              </el-col>
              <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
                  <div id="classify" class="article_list">
                    <div>
                      <h3>分类</h3>
                      <a class="more" href="#" @click="toClassify">More</a>
                    </div>
                    <li @click="get()">全部</li>
                    <li v-for="item in listClassify" :key="item.classifyId" @click="getClassifyAritcle(item.classifyId)">{{ item.classifyName }}</li>
                  </div>
                  <div id="host_article" class="article_list">
                    <div>
                      <h3>热门文章</h3>
                    </div>
                    <li><span class="group_num1">1</span><h3>适合做logo的字体有哪些?</h3></li>
                    <li><span class="group_num2">2</span><h3>朋友的“局”</h3></li>
                    <li><span class="group_num3">3</span><h3>农村的另类奇怪现象</h3></li>
                    <li><span class="group_num4">4</span><h3>谈谈“B端C端化”</h3></li>
                    <li><span class="group_num5">5</span><h3>做好自己</h3></li>
                    <li><span class="group_num6">6</span><h3>且以优雅过一生</h3></li>
                    <li><span class="group_num7">7</span><h3>请记住杨绛先生的这4句话（深度文字）</h3></li>
                    <li><span class="group_num8">8</span><h3>村上春树的那些扎心语录！请细细品味！</h3></li>
                    <li><span class="group_num9">9</span><h3>呼兰河 ，萧红一生回不去的故乡</h3></li>
                  </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>   
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
      classifyId:0,
      imagesbox:[
        {id:0,idView:require("../../assets/back_001.jpg")},
        {id:1,idView:require("../../assets/header001.jpg")},
        {id:2,idView:require("../../assets/001.jpg")}
      ],
      imagesList:[
        require("../../assets/001.jpg")
      ]
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
    getClassifyAritcle(classifyId){
      this.classifyId = classifyId;
      this.$store.dispatch('listAritcle',{
        'search' : this.search,
        'pageSize' : this.pageSize,
        'pageNum' : this.currentPage,
        'classifyId' : classifyId
      });
    },
    get(){
      this.$store.dispatch('listAritcle',{
        'search' : this.search,
        'pageSize' : this.pageSize,
        'pageNum' : this.currentPage,
        'classifyId' : 0
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
}
.el-row-body{
  margin: 10px auto;
}
.content_body{
  margin: 5px auto;
  width: 900px;
}

.content_pic{
  margin: 0px auto;
  /* width: 809px; */
  width: 100%;
  _height: 500px;
  min-height: 500px;
  background-image: url(../../assets/back_001.jpg);
  background-size: 100% 100%;
  border-radius: 10px ;
}

.content_list{
  width: 65%;
  _height: 500px;
  box-sizing: border-box;
  float: left;
}
.indexLeft{
  width: 33%;
  box-sizing: border-box;
  float: right;
}

.article_list{
  margin: 5px auto;
  float: right;
  width: 100%;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px#a4b0be;
}

.article_list > div {
  position: relative;
  width: 100%;
  height: 45px;
  background: #DFE4EA;
}

.article_list > div > h3{
  font-size: 18px;
  color: #2F3542;
  float: left;
  margin: 10px;
}

.more {
  float: right;
  text-decoration-line: none;
  position: relative;
  margin: 10px;
  right: 10px;
  color: #2ED573;
}

#classify > li {
  margin: 10px 10px;
  list-style: none;
  color: #333333;
  font-size: 14px;
  border-bottom: 1px solid #797979;
  padding: 5px;
}

#classify > li:hover{
  cursor: pointer;
}

#host_article > li{
  margin: 10px 10px;
  list-style: none;
}



#host_article > li > h3{
  color: #333333;
  font-size: 14px;
  font-weight: normal;
  margin: 0px auto 0px 20px;
}

.group_num1{
  font-size: 10px;
  color: #FFFFFF;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color: #1E90FF;
  float: left;
}
.group_num1{
  font-size: 10px;
  color: #FFFFFF;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color: #1E90FF;
  float: left;
  text-align: center;
  line-height: 18px;
}
.group_num2{
  font-size: 10px;
  color: #FFFFFF;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color: #1E90FF;
  float: left;
  text-align: center;
  line-height: 18px;
}
.group_num3{
  font-size: 10px;
  color: #FFFFFF;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color: #1E90FF;
  float: left;
  text-align: center;
  line-height: 18px;
}
.group_num4{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}
.group_num5{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}
.group_num6{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}
.group_num7{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}
.group_num8{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}
.group_num9{
  float: left;
  font-size: 10px;
  color: #333333;
  border-radius: 2px;
  width: 16px;
  height: 17px;
  background-color:#F1F2F6 ;
  text-align: center;
  line-height: 18px;
}


</style>
