<template>
  <div id="seeArticle">
    <div class="inner">
      <el-row :gutter="30" style="color: ">
        <el-col :span="2"
          >.
          <div class="opt">
            <li>
              <el-button type="success"
                >评论<i class="el-icon-edit el-icon--right"></i
              ></el-button>
            </li>
            <li>
              <el-button type="warning"
                >点赞<i class="el-icon-star-off el-icon--right"></i
              ></el-button>
            </li>
            <li @click="goBack">
              <el-button type="info"
                >返回<i class="el-icon-back el-icon--right"></i
              ></el-button>
            </li>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="markedArticle" v-html="markedDownContent"></div>
        </el-col>
        <el-col :span="6">
          <div class="toc">

          </div>
        </el-col>
      </el-row>

        <div class="wrapper">
        <div class="container">
            <div class="menu">
                <ul class="menu-list">
                    <li v-for="(nav, index) in navList" :key="index" 
　　　　　　　　　　　　　　:class="{on: activeIndex === index}" 
　　　　　　　　　　　　　　@click="currentClick(index)">
                        <a href="javascript:;" @click="pageJump(nav.index)">{{nav.title}}</a>
                        <div v-if="nav.children.length > 0 && activeIndex === index" 
　　　　　　　　　　　　　　　　class="menu-children-list">
                            <ul class="nav-list">
                                <li v-for="(item, idx) in nav.children" :key="idx" 
　　　　　　　　　　　　　　　　　　　　　:class="{on: childrenActiveIndex === idx}" 
　　　　　　　　　　　　　　　　　　　　　@click.stop="childrenCurrentClick(idx)">
                                    <a href="javascript:;" @click="pageJump(item.index)">
　　　　　　　　　　　　　　　　　　　　　　　　{{item.title}}
　　　　　　　　　　　　　　　　　　　　　 </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>   
    </div>

    </div>
  </div>
</template>

<script>
//引入marked
import marked from "marked";

import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
let rendererMD = new marked.Renderer();
let mdContent = ''
export default {
  name: "seeArticle",
  data() {
    return {
        article: "",
        articleContent:"",
        navList: [],
        activeIndex: 0,
        docsFirstLevels: [],
        docsSecondLevels: [],
        childrenActiveIndex: 0
    };
  },
  //增加计算属性
  computed: {
    content() {
            console.log("daa:"+this.article)
            return this.article
    },
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
      return marked(this.content).replace(/<pre>/g, "<pre class='hljs'>");
    },
  },

  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.getArticle();
  },  
  mounted(){
    // https://my.oschina.net/u/4326108/blog/3675135
    this.navList = this.handleNavTree();
    this.getDocsFirstLevels(0);
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

            let scrollTop = this.$refs.helpDocs.scrollTop
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
            this.$refs.helpDocs.scrollTop = this.$el.querySelector(`#data-${id}`).offsetTop - 40;
            setTimeout(() => this.titleClickScroll = false, 100);
        },
        currentClick(index) {
           this.activeIndex = index
           this.getDocsSecondLevels(index)
        },
        getTitle(content) {
            let nav = [];
            console.log('一、'+content)
            debugger
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
            console.log('2'+content)
            debugger
            // 只处理一级二级标题，以及添加与id对应的index值
            nav = tempArr.filter(item => item.level <= 2);
            console.log('3'+nav)
            debugger
            let index = 0;
            return nav = nav.map(item => {
                item.index = index++;
                return item;
            });
        },
        // 将一级二级标题数据处理成树结构
        handleNavTree() {
          console.log('0->'+this.content)
          debugger
            let navs = this.getTitle(this.content)
            let navLevel = [1, 2];
            let retNavs = [];
            let toAppendNavList;
            console.log(navs)
            debugger
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
            console.log(retNavs)
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
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  background: #f1f2f6;
  box-sizing: border-box;
}
.seeArticle {
  width: 100%;
}
.inner {
  width: 70%;
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
  width: 100%;
  border-radius: 1em;
  padding: 10px;
}
.toc {
  width: 100%;
  height: 200px;
  background: red;
  border-radius: 1em;
  /* margin: 0 0 0 20px; */
}

blockquote {
  border-left: 3px solid green;
  background-color: #ccc;
  margin-left: 1em;
}
</style>
