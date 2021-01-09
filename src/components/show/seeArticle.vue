<template>
  <div id="seeArticle">
    <div class="inner">
        <div class="opt">
            <li>展示</li>
            <li>操作1</li>
            <li>操作2</li>
            <li @click="goBack">返回</li>
        </div>
        <div class="markedArticle" v-html="markedDownContent"></div>
        <div class="toc"></div>
    </div>
  </div>
</template>

<script>
//引入marked
import marked from 'marked'
export default {
  name: 'seeArticle',
  data(){
      return {
          article :''
      }
  },
  //增加计算属性
  computed:{
    markedDownContent:function(){
      return marked(this.article)
    }
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getArticle()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getArticle'
  },
  methods: {
    getArticle() {
      // 去后端获取数据
      this.axios.get('/getArticle',{
        params:{
          articleId : this.$route.query.id
        }
      }).then((url) => {
        if(url.data.Result == 1){
          this.article = url.data.Data.articleBody
        }else{
          alert(url.data.Message)
        }
      })
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei;
  background: #f1f2f6;
  box-sizing: border-box;
}
.seeArticle{
    width:100%;
    
}
.inner{
    
    width: 90%;
    margin: 20px auto;
}
.opt{
    float: left;
    width: 10%;
}
.markedArticle{
    background: #ffffff;
    width: 60%;
    border-radius: 1em;
    padding: 20px;
    margin: 0 0 0 100px;
    float: left;
}
.toc{
    width: 20%;
    height: 200px;
    background: red;
    border-radius: 1em;
    margin: 0 0 0 20px;
    float: left;
}

</style>
