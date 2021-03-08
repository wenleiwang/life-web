<template>
  <div id="show">
    <vheader></vheader>
    <div class="content_body">
      <div class="content_pic">这里是pic</div>
      
      <!-- <artcleList/> --><h1>{{ this.$store.state.count }}</h1>
      <div>
      <h1>{{countTest}}</h1>
      <button @click="addfn()">增加</button>

    </div>

      <div id="classify" class="article_list">
        <div>
          <h3>分类</h3>
          <a class="more" href="#">More</a>
        </div>
        <li>前后端分离之前端</li>
        <li>前后端分离之后端</li>
        <li>我再也没有对你生气</li>
        <li>数据库</li>
        <li>感性生活</li>
        <li>财富自由</li>
      </div>
      <div id="host_article" class="article_list">
        <div>
          <h3>热门文章</h3>
          <a class="more" href="#">More</a>
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
    </div>
    <vfooter></vfooter>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'

import Swiper from 'swiper'

import artcleList from '../ArticleList/articleList'

import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'show',
  data(){
    return {
      list :[],
      pageSize:20,
      currentPage: 1,
      articleTotal:0,
      options: [
        {
            value: "0",
            label: "原创"
        },
        {
            value: "1",
            label: "转载"
        },
        {
            value: "2",
            label: "翻译"
        }
      ]
    }
  },
  computed:{
    countTest () {
      return this.$store.state.name;
    }
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.listArticle()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'listArticle'
  },
  components :{
    vheader,
    vfooter,
    artcleList
  },
  methods :{
    addfn(){
       //提交名为addmu的mutations
       this.$store.commit('addmu');
    },
    listArticle(){
      this.axios.get('/listArticle',{
        
        params:{
          search:'',
          pageNum:this.currentPage,
          pageSize:this.pageSize
        }
      }).then((response) => {
        console.log(response.data)
        if(response.data.Result == 1){
          this.list = response.data.Data
          this.articleTotal = response.data.TotalCount
        }else{
          alert(response.data.Message)
        }
      })
    },
    seeArticle(id){
      this.$router.push({name : 'seeArticle' , query:{id}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.listArticle()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.listArticle()
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

.content_body{
  margin: 5px auto;
  width: 60%;
  height: 100%;
}

.content_pic{
  margin: 0px auto;
  /* width: 809px; */
  width: 100%;
  _height: 500px;
  min-height: 500px;
  background-image: url(../../assets/002.jpg);
  background-size: 100% 100%;
  border-radius: 10px ;
}


.page_item{
  width:80%;
  margin: 0 auto ;
  background: green;
}
.page_item_float{
  margin: 10px auto;
  float: left;
}

.more {
  float: right;
  text-decoration-line: none;
  display: block;
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
