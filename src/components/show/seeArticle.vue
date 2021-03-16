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
          <el-tree
            :data=this.classifyList
            node-key="id"
            default-expand-all
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
      <el-container>
        <el-main>
          <div id="seeArticle">
            <div class="inner">
              <el-row :gutter="30" style="color: ">
                <!-- <el-col :span="2">. -->
                  <!-- <div class="opt">
                    <li>
                      <el-button type="success">评论<i class="el-icon-edit el-icon--right"></i></el-button>
                    </li>
                    <li>
                      <el-button type="warning">点赞<i class="el-icon-star-off el-icon--right"></i></el-button>
                    </li>
                    <li @click="goBack">
                      <el-button type="info">返回<i class="el-icon-back el-icon--right"></i></el-button>
                    </li>
                  </div> -->
                <!-- </el-col> -->

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
        </el-main>

        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  
</template>

<script>
//引入marked
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
import vheader from '@/components/show/vheader'

let rendererMD = new marked.Renderer();
let mdContent = ''
export default {
  name: "seeArticle",
  data() {
    return {
        article: "",
        articleName:"",
        articleContent:"",
        navList: [],
        activeIndex: 0,
        docsFirstLevels: [],  // 文档第一级标题
        docsSecondLevels: [], // 文档第二级标题
        childrenActiveIndex: 0,
        scrollDirection:true,
        helpDocsScrollTop:0,
        classifyList:[
          {id:1,label:'一级1'},
          {id:1,label:'一级2'},
          {id:1,label:'一级3'},
          {id:1,label:'一级4'},
          {id:1,label:'一级4'},
          {id:1,label:'一级4'},
          {id:1,label:'一级4'},
          {id:1,label:'一级4'},
        ]
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
    window.addEventListener('scroll',this.handleScroll,true);
    window.addEventListener('scroll',this.docsScroll,true);
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "getArticle",
  },
  methods: {
    getArticle() {
      // 去后端获取数据
      this.axios
        .get("/getArticle", {
          params: {
            articleId: this.$route.query.id,
          },
        })
        .then((url) => {
          if (url.data.Result == 1) {
            this.article = url.data.Data.articleBody;
            this.articleName = url.data.Data.articleName;
          } else {
            alert(url.data.Message);
          }
        });
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
      if (this.titleClickScroll) {
          return;
      }
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                document.body.scrollTop
      let firstLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsFirstLevels)
      this.currentClick(firstLevelIndex)

      let secondLevelIndex = this.getLevelActiveIndex(scrollTop, this.docsSecondLevels)
      this.childrenCurrentClick(secondLevelIndex)
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
      document.documentElement.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 40;
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
      console.log('0->'+this.article)
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
      // 页面滚动距顶部距离
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                document.body.scrollTop
      if(scrollTop<70){
        this.scrollDirection = true;
      }else{
        this.scrollDirection = false;
      }
    },
  }
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  background: #fff;
  box-sizing: border-box;
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
  background-color: #ccc;
  margin-left: 1em;
}
</style>
