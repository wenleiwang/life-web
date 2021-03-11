<template>
  <div id="show">
            <div class="blog_content">
        <!-- 循环列表 -->
        <div class="article_item" v-for="item in listArticleMounted" :key="item.articleId" @click="seeArticle(item.articleId)">
          <div class="article_content">
            <button v-bind:class="{'btn_danger' : item.articleFlag == 0,
                                   'btn_warn' : item.articleFlag == 1,
                                   'btn_success' : item.articleFlag == 2}">
              {{ options[item.articleFlag]['label'] }}
            </button>
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
              :page-sizes="[20, 40, 60, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="articleTotal">
            </el-pagination>
          </div>
          
        </div>
        
      </div>
  </div>


</template>

<script>

export default {
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
    listArticleMounted(){
      var data = this.$store.state.listAritcle
      debugger
      return data
    }
  },
  methods:{
    seeArticle(id){
      this.$router.push({name : 'seeArticle' , query:{id}})
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.$store.dispatch('listAritcle',{
            'search' : '',
            'pageSize' : this.pageSize,
            'pageNum' : this.currentPage
        });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.$store.dispatch('listAritcle',{
            'search' : '',
            'pageSize' : this.pageSize,
            'pageNum' : this.currentPage
        });
    }
  }
}
</script>

<style>
.blog_content{
  margin: 5px auto;
  width: 95%;
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
  height: 200px;
  margin: 15px auto;
  float: left;
  border-bottom: 1px solid #ced6e0;
}
.article_item:hover{
  cursor: pointer;
}
.article_content{
  float: left;
  margin: 0px auto;
  width: 85%;
}
.article_pic{
  width: 15%;
  height: 150px;
  margin: 20px 0;
  border: 1px solid #ffffff;
  float: left;
  box-sizing: border-box;
}
.article_content > button{
  
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
  position: relative;
  width: 80%;
}

.article_content > p{
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



.article_pic > img{
  border-radius: 5px;
  min-height: 150px;
  width: 100%;
  height: 100%;
}


.btn_danger{
  background-color: #FF4757;
}
.btn_warn{
  background-color:#ffa502;
}
.btn_success{
  background-color: #2ed573;
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
</style>
