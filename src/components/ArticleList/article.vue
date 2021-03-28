<template>
    <div id="seeArticle">
      <div class="inner">
          <el-row :gutter="30" type="flex" justify="center"  align="top">
            <el-col :xs="24" :sm="16" :md="18" :lg="18" :xl="18">
              <div id="markedDocument" class="markedArticle" v-html="markedDownContent" ref="helpDocs"></div>
            </el-col>

            <el-col :xs="0" :sm="8" :md="6" :lg="6" :xl="6">
              <ul>
                <li v-for="item in this.tocItemList" :key="item.anchor" :class="`toc-` + item.level">
                  <a :href="`#` + item.anchor" :class="{'active' : item.anchor === active}">{{ item.text }}</a>
                </li>
              </ul>
              <!-- <div class="toc">
                <div class="wrapper">
                  <div class="container">
                    <div class="menu">
                      <ul class="menu-list">
                        <li v-for="(nav, index) in navList" :key="index" :class="{liColor: activeIndex === index}" @click="currentClick(index)">
                          <a href="javascript:;" @click="pageJump(nav.index)">{{nav.title}}</a>
                          <div v-if="nav.children.length > 0 && activeIndex === index" class="menu-children-list">
                            <ul class="nav-list">
                              <li v-for="(item, idx) in nav.children" :key="idx" :class="{liColor: childrenActiveIndex === idx}" @click.stop="childrenCurrentClick(idx)">
                                <a href="javascript:;" :class="{textColor: childrenActiveIndex === idx}" @click="pageJump(item.index)">{{item.title}}</a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>   
                </div>
              </div> -->
            </el-col>
          </el-row>
        </div>
      </div>  
</template>

<script>
//引入marked
import marked from "marked";

import hljs from "highlight.js";
// import "highlight.js/styles/tomorrow-night-eighties.css";
import "highlight.js/styles/monokai-sublime.css";
import vheader from '@/components/show/vheader'
// import Tocify from './tocify.tsx'
import { join } from 'lodash';
import {listArticleFromClassifyId} from '../../api'

let rendererMD = new marked.Renderer();
let tocList = [];
// let tocify = new Tocify()
export default {
  name: "seeArticle",
  data() {
    return {
        article: "",
        articleName:"",
        classifyId : 0,
        articleInfo:{},
        classifyArticleList:[],
        classifyList:[],
        tocItemList:[],
        itemTab:[],
        active:'',
        markedHtml:''
    };
  },
  components :{
    vheader
  },
  //增加计算属性
  computed: {
    markedDownContent: function () {
        marked.setOptions({
        renderer: rendererMD,  // 这个是必须填写的
        gfm: true,  // 启动类似Github样式的Markdown,
        pedantic: false,  // 只解析符合Markdown定义的，不修正Markdown的错误
        sanitize: false,  // 原始输出，忽略HTML标签
        tables: true,  // 支持Github形式的表格，必须打开gfm选项
        breaks: false,  // 支持Github换行符，必须打开gfm选项
        smartLists: true,  // 优化列表输出
        smartypants: false,
        // 高亮显示规则 ，这里使用highlight.js来完成
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        }
      })
        let index = 0;
        rendererMD.heading = function(text, level) {
          let tocItem = {
            anchor:'',
            level:'',
            text:''
          }
          let anchor = `toc-${++index}`
          tocItem.anchor = anchor
          tocItem.level = level
          tocItem.text = text
          tocList.push(tocItem)
          return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
        };
            // https://my.oschina.net/u/4326108/blog/3675135
      // return marked(this.content).replace(/<pre>/g, "<pre class='hljs'>");
      this.tocItemList = tocList;
      var markedHteml = marked(this.content)

      return markedHteml
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
    //当页面中所有元素加载完成触发
    window.addEventListener("scroll", this.onscroll);
    //为浏览器添加“scroll”滚动条滚动事件
    document.getElementById('markedDocument').addEventListener("DOMSubtreeModified", this.addTocOffsetList);
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
        this.$refs.tree.setCurrentKey(this.$route.query.id)
      })
    },
  },
  methods: {
    async getArticle() {
      // 去后端获取数据
      await this.axios
        .get("/getArticle", {
          params: {
            articleId: 20,
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
    //所有方法
    onscroll(Event) {
      //滚动事件
      let ws = window.scrollY; //当前滚动条位置
      this.itemTab.forEach((item, index) => {//循环检测每个标题的位置
        if (ws>item.offset-50) {//判断当前滚动条大于
          this.active = item.classId;//将最后一个大于item的下标赋值给active
                              //active是当前滚动条对应的标题位置
        }
      });
    },
    addTocOffsetList(){
      for (let i = 1; i <= this.tocItemList.length ; i++) {
        //循环获取的list中标题的位置
        let ele = document.getElementById('toc-' + i);
        let item ={
          offset:0,
          classId:''
        }
        item.offset = ele.offsetTop
        item.classId = 'toc-' + i;
        this.itemTab.push(item);
        //获取位置后添加到itemTab数组
      }
    },
  }
};
</script>

<style>
.el-container{
  /* height: 100%; */
}

.seeArticle {
    width: 100%;
    border-left: 1px solid red;
}
.inner {
  width: 100%;
  margin: 0 20px;
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
  /* position: fixed; */
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

.toc-1{
  margin-left: 10px;
}
.toc-2{
  margin-left: 20px;
}
.toc-3{
  margin-left: 30px;
}
.toc-4{
  margin-left: 40px;
}
.toc-5{
  margin-left: 50px;
}
.toc-6{
  margin-left: 60px;
}

</style>
