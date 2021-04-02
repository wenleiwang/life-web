<template>
  <el-container>
    <el-header>
      <div class="articleHeader" >
        <vheader v-show="scrollDirection"/>
        <div class="titleName" v-show="!scrollDirection">
          <h3>{{ this.articleName }}</h3>
        </div>
      </div>
    </el-header>
    
    <el-container>
      <el-aside width="20%">
        <div class="classifyList">
          <h3 class="classifyTitle">{{ articleInfo.classifyName }}</h3>
          <el-tree ref="tree"
            :data=this.classifyList
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag">
          </el-tree>
        </div>
      </el-aside>
      <el-main>
        <el-row type="flex" >
          <el-col :span="20"><artcle :classifyIdPorp="showH3+``"/></el-col>
        </el-row>
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
//引入marked
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
import vheader from '@/components/show/vheader'
import artcle from '../ArticleList/article'

import {listArticleFromClassifyId} from '../../api'

let rendererMD = new marked.Renderer();
let mdContent = ''
export default {
  name: "seeArticle",
  data() {
    return {
        article: "",
        articleName:"",
        articleContent:"",
        classifyId : 0,
        articleInfo:{},
        classifyArticleList:[],
        navList: [],
        activeIndex: 0,
        docsFirstLevels: [],  // 文档第一级标题
        docsSecondLevels: [], // 文档第二级标题
        childrenActiveIndex: 0,
        scrollDirection:true,
        helpDocsScrollTop:0,
        classifyList:[],
        showH3: '',
    };
  },
  components :{
    vheader,
    artcle
  },
  //增加计算属性
  computed: {
    markedDownContent: function () {
        marked.setOptions({
            renderer: rendererMD,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
        });
        let index = 0;
        rendererMD.heading = function(text, level) {
          
          if (level <= 2) {
              return `<h${level} id="data-${index++}">${text}</h${level}>`;
          } else {
              return `<h${level}>${text}</h${level}>`;
          }
        };
            // https://my.oschina.net/u/4326108/blog/3675135
        this.navList = this.handleNavTree();
        this.getDocsFirstLevels(0);
      return marked(this.content).replace(/<pre>/g, "<pre class='hljs'>");
    },
    content() {
      return this.article
    },
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getArticle();
  },
  mounted(){

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getArticle",
    articleInfo(){
      this.$nextTick( () => {
        this.getClassifyArticleList()
      })
    },
    classifyList(){
      this.$nextTick( () => {
        let tree = this.$refs.tree
        tree.setCurrentKey(this.$route.query.id)
      })
    }
  },
  methods: {
    async getArticle() {
      // 去后端获取数据
      await this.axios
        .get("/getArticle", {
          params: {
            articleId: this.$route.query.id,
          },
        })
        .then((url) => {
          if (url.data.Result == 1) {
            this.article = url.data.Data.articleBody;
            this.articleName = url.data.Data.articleName;
            this.classifyId = url.data.Data.classifyId;
            this.articleInfo = url.data.Data;
          } else {
            alert(url.data.Message);
          }
        });
        
    },
    // 获取分类的所有文章列表
    async getClassifyArticleList(){
      const result = await listArticleFromClassifyId({'classifyId':this.classifyId});

      if(result.Result === 1){
          this.classifyArticleList = result.Data
          const list = [];
          this.classifyArticleList.forEach(e => {
            var obj1 = {
              id : 0,
              label :''
            }
            obj1.id = e.articleId;
            obj1.label = e.articleName
            list.push(obj1)
          } )
          this.classifyList =  list
      }
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },  
    
    // ****************************** 拖拽
    handleNodeClick(data) {
      var id = data.id
      this.showH3 = id + ''
      this.$router.push({name : 'seeArticle' , query:{id}})
    },
    handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
  }
};
</script>

<style>

.el-main{
  /* background: #fff; */
  width: 100%;
  padding: 0;
}
.el-header ,.el-footer{
  background-color: #2c3e50;
  color: #fff;
  padding: 0;
  height: 70px;
}

.el-aside {
  background-color: #f1f2f6;
  color: #333;
  text-align: center;
  padding: 20px;
}
.classifyList{
  position: fixed;
  width: 18%;
  
}
.classifyTitle{
  text-align: left;
  padding: 0 20px;
}
.el-tree{
  background: #f1f2f6;
}
.articleHeader{
  margin: 0 auto;
  width: 100%;
  position: fixed;
  z-index: 99;
}
.articleHeader > .titleName{
  margin: 0;
  width: 100%;
  height: 70px;
  position: fixed;
  z-index: 99;
  background-color: #2c3e50;
  color: #fff;
}
.articleHeader > .titleName > h3{
  width: 70%;
  margin: 20px auto;
  font-size: 22px;
  font-family: 'Microsoft YaHei';

}

.is-current{
 color: #2ed573;
}
</style>
