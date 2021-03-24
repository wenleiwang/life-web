<template>
    <div id="seeArticle">
        <div class="inner">
            <el-row :gutter="30" style="color: ">
            <el-col :span="16">
                <div class="markedArticle" v-html="markedDownContent" ref="helpDocs" @scroll="docsScroll"></div>
            </el-col>

            <el-col :span="6">
                <div class="toc">
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
                </div>
            </el-col>

            </el-row>

        </div>
    </div>  
</template>

<script>
//引入marked
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
import vheader from '@/components/show/vheader'

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
        classifyList:[]
    };
  },
  components :{
    vheader
  },
  //增加计算属性
  computed: {
    markedDownContent: function () {
        marked.setOptions({
            renderer: rendererMD,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            },
            pedantic: false,//默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
            gfm: true,//默认为true。 允许 Git Hub标准的markdown.
            tables: true,//默认为true。 允许支持表格语法。该选项要求 gfm 为true。
            breaks: false,//默认为false。 允许回车换行。该选项要求 gfm 为true。
            sanitize: false,//对输出进行过滤（清理）
            smartLists: true,
            smartypants: false,//使用更为时髦的标点，比如在引用语法中加入破折号。
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
    window.addEventListener('scroll',this.handleScroll,true);
    window.addEventListener('scroll',this.docsScroll,true);
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
    }
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
    childrenCurrentClick(index) {
      this.childrenActiveIndex = index
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
          let firstLevels = [];
          Array.from(document.querySelectorAll('h1'), element => {
              firstLevels.push(element.offsetTop - 60)
          })
          this.docsFirstLevels = firstLevels;

          if (times < 8) {
              this.getDocsFirstLevels(times + 1);
          }
      }, 500);
    },
    getDocsSecondLevels(parentActiveIndex) {
      let idx = parentActiveIndex;
      let secondLevels = [];
      let navChildren = this.navList[idx].children
      if(navChildren.length > 0) {
          secondLevels = navChildren.map((item)=>{
            return this.$el.querySelector(`#data-${item.index}`).offsetTop - 60
          })
          this.docsSecondLevels = secondLevels;
      }
    },
    docsScroll() {
      if(this.$route.path === '/show/seeArticle'){
        if (this.titleClickScroll) {
            return;
        }
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                  document.body.scrollTop
        let firstLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsFirstLevels)
        this.currentClick(firstLevelIndex)

        let secondLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsSecondLevels)
        this.childrenCurrentClick(secondLevelIndex)
      }
    },
    getLevelActiveIndex(scrollTop, docsLevels) {
      let currentIdx = null;
      let nowActive = docsLevels.some((currentValue, index) => {
          if(currentValue >= scrollTop) {
              currentIdx = index
              return true
          }
      })

      currentIdx = currentIdx - 1
      
      if (nowActive && currentIdx === -1) {
          currentIdx = 0
      } else if (!nowActive && currentIdx === -1) {
          currentIdx = docsLevels.length - 1
      }
      return currentIdx     
    },
    pageJump(id) {
      this.titleClickScroll = true;
      console.log(this.$el.querySelector(`#data-${id}`).offsetTop)
      document.documentElement.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 20;
      setTimeout(() => this.titleClickScroll = false, 100);
    },
    currentClick(index) {
      this.activeIndex = index
      this.getDocsSecondLevels(index)
    },
    getTitle(content) {
      let nav = [];
      let tempArr = [];
      content.replace(/(#+)[^#][^\n]*?(?:\n)/g, function(match, m1, m2) {
              let title = match.replace('\n', '');
              let level = m1.length;
              tempArr.push({
                  title: title.replace(/^#+/, '').replace(/\([^)]*?\)/, ''),
                  level: level,
                  children: [],
              });
          });
      // 只处理一级二级标题，以及添加与id对应的index值
      nav = tempArr.filter(item => item.level <= 2);
      let index = 0;
      return nav = nav.map(item => {
          item.index = index++;
          return item;
      });
    },
    // 将一级二级标题数据处理成树结构
    handleNavTree() {
      let navs = this.getTitle(this.article)
      let navLevel = [1, 2];
      let retNavs = [];
      let toAppendNavList;
      navLevel.forEach(level => {
          // 遍历一级二级标题，将同一级的标题组成新数组
          toAppendNavList = this.find(navs, {
              level: level
          });
          
          if (retNavs.length === 0) {
              // 处理一级标题                    
              retNavs = retNavs.concat(toAppendNavList);
          } else {
              // 处理二级标题，并将二级标题添加到对应的父级标题的children中    
              toAppendNavList.forEach(item => {
                  item = Object.assign(item);
                  let parentNavIndex = this.getParentIndex(navs, item.index);
                  return this.appendToParentNav(retNavs, parentNavIndex, item);
              });
          }
      });
      return retNavs;
    },
    find(arr, condition) {
      return arr.filter(item => {
          for (let key in condition) {
              if (condition.hasOwnProperty(key) && condition[key] !== item[key]) {
                  return false;
              }
          }
          return true;
      });
    },
    getParentIndex(nav, endIndex) {
      for (var i = endIndex - 1; i >= 0; i--) {
          if (nav[endIndex].level > nav[i].level) {
              return nav[i].index;
          }
      }
    },
    appendToParentNav(nav, parentIndex, newNav) {
      let index = this.findIndex(nav, {
          index: parentIndex
      });
      nav[index].children = nav[index].children.concat(newNav);
    },
    findIndex(arr, condition) {
      let ret = -1;
      arr.forEach((item, index) => {
          for (var key in condition) {
              if (condition.hasOwnProperty(key) && condition[key] !== item[key]) { 
                  return false;
              }
          }
          ret = index;
      });
      return ret;
    },
    handleScroll(){
      if(this.$route.path === '/show/seeArticle'){
        // 页面滚动距顶部距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                  document.body.scrollTop
        if(scrollTop<70){
          this.scrollDirection = true;
        }else{
          this.scrollDirection = false;
        }
      }
    },
    
    // ****************************** 拖拽
    handleNodeClick(data) {
      var id = data.id
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
  background-color: #ccc;
  margin-left: 1em;
}
</style>
