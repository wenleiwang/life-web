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
.seeArticle {
  width: 100%;
}
.inner {
  width: 80%;
  margin: 20px auto;
}
.opt {
  width: 100%;
  position: fixed;
}
.opt > li {
  list-style: none;
}
.markedArticle {
  background: #ffffff;
  border-radius: 1em;
  padding: 10px;
  overflow: auto
}
.toc {
  width: 100%;
  height: 200px;
  border-radius: 1em;
  position: fixed;
}
a {
  text-decoration: none;
  color: #747d8c;
}
a:hover{
  cursor: pointer;
}

.toc .wrapper{
  border-left: 2px solid #a4b0be;
}

.menu-list > li {
  margin: 10px auto;
}

.textColor{
  color: #2ed573;
}

.liColor{
  color: #ffa502;
}

blockquote {
  border-left: 3px solid green;
  margin-left: 0em;
  padding-left: 5px;
}
/**图片 */
.markedArticle img{
  width: 100%;
}
/* 代码块 */
code {
  display: inline-block ;
  background-color:#f3f3f3;
  border:1px solid #fdb9cc;
  border-radius:3px;
  font-size: 12px;
  padding: 5px;
  color:#4f4f4f;
  margin: 0px 3px;
  font-family: Menlo,Monaco,Consolas,"Andale Mono","lucida console","Courier New",monospace;
  
}
.bread-div{
    padding: .5rem;
    border-bottom:1px solid #eee;
    background-color: #e1f0ff;
}
.detailed-title{
    font-size: 1.8rem;
    text-align: center;
    padding: 1rem;
}
.center{
    text-align: center;
}
.detailed-content{
    padding: 1.3rem;
    font-size: 1rem;
}
pre{
    display: block;
    background-color:#f3f3f3;
     padding: .5rem !important;
     overflow-y: auto;
     font-weight: 300;
     font-family: Menlo, monospace;
     border-radius: .3rem;
}
pre{
    background-color: #283646 !important;
}
pre >code{
    border:0px !important;
    background-color: #283646 !important;
    color:#FFF;

}
.title-anchor{
    color:#888 !important;
    padding:4px !important;
    margin: 0rem !important;
    height: auto !important;
    line-height: 1.2rem !important;
    font-size: .7rem !important;
    border-bottom: 1px dashed #eee;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.active{
    color:rgb(30, 144, 255) !important;
}
.nav-title{
    text-align: center;
    color: #888;
    border-bottom: 1px solid rgb(30, 144, 255);

}
.article-menu{
    font-size:12px;
}
iframe{
    height: 34rem;
}
.detailed-content  img{
    width: 100%;
    border:1px solid #f3f3f3;
}
.title-level3{
    display: none !important;
}
.ant-anchor-link-title{
    font-size: 12px !important;
}
.ant-anchor-wrapper{
    padding: 5px !important;
}
/**end */

.is-current{
 color: #2ed573;
}
</style>
