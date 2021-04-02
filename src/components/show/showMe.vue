<template>
  <div id="show">
    <vheader></vheader>
    <div class="content_body">
      <div class="content_pic">这里是pic</div>
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
    vfooter
  },
  methods :{
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


</style>
