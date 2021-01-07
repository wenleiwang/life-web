<template>
  <div id="show">
    <vheader></vheader>
    <div class="content_body">
      <div class="content_pic">这里是pic</div>
      <div class="blog_content">
        <!-- 循环列表 -->
        <div class="article_item" v-for="item in list" :key="item.articleId" @click="seeArticle(item.articleId)">
          <div class="article_content">
            <button>原创</button>
            <h3>{{item.articleName}}</h3>
            <p>{{item.articleDescription}}</p>
            <div class="article_info">
              <img src="../../assets/header001.jpg" alt="">
              <p>文文</p>
              <p>{{item.updateTime}}</p>
              <img src="../../assets/see.png" alt="首图">
              <p>{{item.starNum}}</p>
            </div>
          </div>
          <div class="article_pic">
            <img :src="item.articleImgUrl" alt="">
          </div>
        </div><!-- end循环列表 -->
        
        <!--  分页小标-->
        <div class="page_item">
          <div  class="page_item_float">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
          
        </div>
        
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
export default {
  name: 'show',
  data(){
    return {
      list :[],
      pageNum:1,
      pageSize:20,
      currentPage: 1
    }
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.listArticle(1)
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'listArticle'
  },
  components :{
    vheader,
    vfooter
  },
  methods :{
    listArticle(page){
      this.$axios.get('/listArticle',{
        params:{
          search:'',
          pageNum:page,
          pageSize:20
        }
      }).then((url) => {
        if(url.data.Result == 1){
          this.list = url.data.Data
          var total = url.data.TotalCount
          var maxPage = parseInt(total / this.pageSize)
          if(total % this.pageSize > 0){
            maxPage ++;
          }
          var pageList ="";
          var firstHtml = "<span class='page_false' @click='listArticle(1)'>First</span>"
          var lastHtml = "<span class='page_false' @click='listArticle(" + maxPage + ")'>Last</span>"
          var pageHtml = ""
          pageList += firstHtml;

          var start = (this.pageNum -2) > 0 ? (this.pageNum - 2) : 1;
          var end = (maxPage - this.pageNum) > 2 ? (this.pageNum + 2) : maxPage;

          for(var i = start ; i <= end ; i++){
            if(i == this.pageNum){
             pageList += "<span class='page_true' @click='listArticle("+ i +")'>"+ i +"</span>";
            }else{
              pageList += "<span class='page_false' @click='listArticle("+ i +")'>"+ i +"</span>";
            }
          }
          pageList += lastHtml;
        }else{
          alert(url.data.Message)
        }
      })
    },
    seeArticle(id){
      this.$router.push({name : 'seeArticle' , query:{id}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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

.blog_content{
  margin: 5px auto;
  width: 60%;
  height: 100%;
  float: left;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px #a4b0be;
  padding: 0px 10px 0px 10px;
  position:relative;
}

.article_item{
  width: 100%;
  margin: 15px auto;
  float: left;
}
.article_item:hover{
  cursor: pointer;
}

.article_content > button{
  background-color: #FF4757;
  font-size: 10px;
  border-radius: 2px;
  padding: 5px;
  border: 0px;
  color: #FFFFFF;
  margin: 0px 5px 0px 0px;
  float: left;
}

.blog_content h3{
  font-size: 18px;
  font-family: Microsoft YaHei;
  color: #2F3542;
  margin: 0px auto 0px 10px;
}

.blog_content > p{
  color: #57606F;
  font-family: Microsoft YaHei;
  font-size: 14px;
}
.article_info{
  margin: 0px auto;
}

.article_info > p{
  color: #747D8C;
  font-family: Microsoft YaHei;
  font-size: 12px;
  float: left;
  margin: 0px 2px;
  padding: 0px;
}

.article_info > img{
  margin: 2px 0px 2px 0px;
  float: left;
  width: 12px;
  height: 12px;
  border-radius: 12px;
}

.article_content{
  float: left;
  margin: 0px auto;
  width: 70%;
}
.article_pic{
  float: left;
}

.article_pic > img{
  border-radius: 5px;
  width: 150px;
  height: 92px;
  margin: 0 20px;
}

.article_list{
  margin: 5px auto;
  float: right;
  width: 400px;
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
