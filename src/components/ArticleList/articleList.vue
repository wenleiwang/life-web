<template>
  <div id="show" class="blog_content">
    <el-row >
      <el-col :span="24">
        <!-- 循环列表 -->
        <div class="article_item" v-for="item in listArticleMounted" :key="item.articleId" @click="seeArticle(item.articleId)">
          <el-row type="flex" justify="center" :gutter="10">
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <div class="article_content">
                <el-row>
                  <el-col :span="24" class="info-header">
                    <li>
                      <button v-bind:class="{'btn_danger' : item.articleFlag == 0,
                        'btn_warn' : item.articleFlag == 1,
                        'btn_success' : item.articleFlag == 2}">
                        {{ options[item.articleFlag]['label'] }}
                      </button>
                    </li>
                    <li>
                      <h3>{{item.articleName}}</h3>
                    </li>
                  </el-col>
                </el-row>
                
                <el-row class="info-text">
                  <el-col>
                    <p>{{item.articleDescription}}</p>
                  </el-col>
                </el-row>
                <el-row class="info-li">
                  <el-col class="el-col-li">
                    <li><img src="../../assets/header001.jpg" alt="头像"></li>
                    <li class="info-p"><p>文文</p></li>
                    <li><img src="../../assets/see.png" alt="浏览数"></li>
                    <li><p>{{item.starNum}}</p></li>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6">
              <div class="article_pic">
                <img :src="item.articleImgUrl" alt="">
              </div>
            </el-col>
          </el-row>
        </div>
        <!-- end循环列表 -->
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="0" :sm="20" :md="20" :lg="20" :xl="20">
        <!--  分页小标-->
        <div class="page_item">
          <div  class="page_item_float">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[2, 5, 40, 80]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="articleTotalComputed">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  props:{
    pageSize:Number,
    currentPage:Number
  },
  data(){
    return {
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
      return data
    },
    articleTotalComputed(){
      return this.$store.state.articleTotal
    }
  },
  methods:{
    seeArticle(id){
      this.$router.push({name : 'seeArticle' , query:{id}})
    },
    handleSizeChange(val) {
      this.$emit('handle-size-change',val);
    },
    handleCurrentChange(val) {
      this.$emit('handle-current-change',val);
    },
    currentPageChange(val){
      console.log(val)
    }
  }
}
</script>

<style>
.blog_content{
  margin: 5px auto;
  width: 95%;
  /* height: 100%; */
  float: left;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px #a4b0be;
  padding: 0px 10px 0px 10px;
  position:relative;
}

.article_item{
  width: 100%;
  /* height: 180px; */
  margin: 15px auto;
  float: left;
  border-bottom: 1px solid #ced6e0;
}
.article_item:hover{
  cursor: pointer;
}

.article_pic{
  width: 100px;
  height: 100px;
  margin: 20px 0;
  border: 1px solid #ffffff;
  float: left;
  box-sizing: border-box;
}

.info-header > li{
  list-style: none;
  float: left;
}
.info-header > li > h3{
  font-size: 20px;
  font-family: Microsoft YaHei;
  color: #2F3542;
  margin: 0px auto 0px 10px;
  position: relative;
}
.info-header > li > button{
  
  font-size: 10px;
  border-radius: 2px;
  padding: 5px;
  border: 0px;
  color: #FFFFFF;
  margin: 0px 5px 0px 0px;
  float: left;
}

.info-text{
  margin: 8px auto;
}

.info-text p{
  color: #747D8C;
  font-family: Microsoft YaHei;
  font-size: 16px;
  float: left;
  margin: 0px 2px;
  padding: 0px;
}

.info-li{
  font-size: 14px;
  height: 14px;
  margin: 8px auto;
}
.el-col-li >li{
  list-style: none;
  float: left;
}
.el-col-li >li > p{
  color: #747D8C;
  font-family: Microsoft YaHei;
  font-size: 14px;
  float: left;
  margin: 0px 4px;
  padding: 0px;
}

.el-col-li >li > img{
  width: 20px;
  height: 20px;
  border-radius: 10px;
}



.article_pic > img{
  border-radius: 5px;
  width: 100%;
  height: 100%;
  margin: 0px 4px;
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
