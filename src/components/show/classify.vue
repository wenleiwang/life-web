<template>
  <div id="show">
    <el-container>
      <el-header  height="70px">
        <vheader></vheader>
      </el-header>
      <el-container class="body-container">
        <el-aside width="25%">
          <ul>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费1</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
            <li>测试斯蒂芬就爱浪费2</li>
          </ul>
        </el-aside>
        <el-main>
          <artcleList/>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'
import artcleList from '../ArticleList/articleList'
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
    vfooter,
    artcleList
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
}
.el-aside > ul > li{
  width: 100%;
  list-style: none;
  flex-shrink: 0;
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
