<template>
  <div id="show">
            <div class="blog_content">
        <!-- 循环列表 -->
        <div class="article_item" v-for="item in list" :key="item.articleId" @click="seeArticle(item.articleId)">
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

}
</script>

<style>
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
  
  font-size: 10px;
  border-radius: 2px;
  padding: 5px;
  border: 0px;
  color: #FFFFFF;
  margin: 0px 5px 0px 0px;
  float: left;
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

</style>
