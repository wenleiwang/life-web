<template>
  <div id="show">
    <vheader></vheader>
    <el-row type="flex" justify="center" class="activeDate">
      <el-col :span="16">
        <el-row>
          <el-col :span="4">
            <el-collapse  accordion>
              <el-collapse-item title="书名1" name="1">
                <el-collapse v-model="activeName" accordion >
                  <h3 @click="seeArtcle(1)" :class="{'is-active-h3' : showH3 === 1}">第一章</h3>
                  <h3 @click="seeArtcle(2)" :class="{'is-active-h3' : showH3 === 2}">第二章</h3>
                </el-collapse>
              </el-collapse-item>

              <el-collapse-item title="书名2" name="1">
                <el-collapse v-model="activeName" accordion >
                  <h3 @click="seeArtcle(1)" :class="{'is-active-h3' : showH3 === 1}">第一章</h3>
                  <h3 @click="seeArtcle(2)" :class="{'is-active-h3' : showH3 === 2}">第二章</h3>
                </el-collapse>
              </el-collapse-item>

            </el-collapse>
          </el-col>
          <el-col :span="20">
            <artcle/>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>


</template>

<script>
import vheader from '@/components/show/vheader'
import vfooter from '@/components/show/vfooter'
import artcleList from '../ArticleList/articleList'
import artcle from '../ArticleList/article'
import nodata from '../error/nodata'

import {apiUserListClassify} from '../../api'
export default {
  name: 'show',
  data(){
    return {
      activeName: '1',
      showH3: 0,
      pageSize:20,
      currentPage: 1,
      classifyId:0,
      search:'',
      listClassify:[
        {'classifyId':1,'classifyName':'测试'}
      ],
      tree:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  created (){
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.userListClassify()
    this.getArticle()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'userListClassify'
  },
  computed:{

  },
  components :{
    vheader,
    vfooter,
    artcleList,
    nodata,
    artcle
  },
  methods :{
    get(classifyId){
      this.classifyId = classifyId;
      this.$store.dispatch('listAritcle',{
        'search' : this.search,
        'pageSize' : this.pageSize,
        'pageNum' : this.currentPage,
        'classifyId' : classifyId
      });
    },
    handleSizeChange(val){
      this.pageSize = val;
      this.get()
    },
    handleCurrentChange(val){
      this.currentPage = val;
      this.get()
    },
    async userListClassify(){
      const result = await apiUserListClassify({});
      if(result.Result === 1){
        this.listClassify = result.Data
      }else{
        this.$message.error('请求失败！');
      }
    },
    async getArticle() {
      // 去后端获取数据
      await this.axios
        .get("/getArticle", {
          params: {
            articleId: 22,
          },
        })
        .then((url) => {
          if (url.data.Result == 1) {
            this.initialCalue = url.data.Data.articleBody;
          } else {
            return null;
          }
        });
        
    },
    handleNodeClick(data) {
      console.log(data);
    },
    seeArtcle(val){
      this.showH3 = val;
      console.log('点击查看文章详情')
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
.activeDate{
  margin: 10px auto;
}
.onClassify{
  color: #2ed573;
}
.el-aside > ul > li > h3 > a:hover{
  color: #ff6348;
}

.el-collapse > .el-collapse-item > div > .el-collapse-item__header
{
  padding-left: 5px;
  border-radius: 2px;
}
.el-collapse > .el-collapse-item > div >.is-active{
  border-left: 2px solid #ff6348;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content {
  padding-bottom: 0;
  border-bottom: 0px;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content > .el-collapse > .el-collapse-item > div > .el-collapse-item__header{
  padding-left: 20px;
  border-radius: 2px;
  height: 30px;
}
.el-collapse > .el-collapse-item > .el-collapse-item__wrap > .el-collapse-item__content > .el-collapse > .el-collapse-item > div > .is-active{
  border-left: 2px solid #ffa502;
  color: #ffa502;
  height: 30px;
}

.is-expanded{
  color: #2ed573;
}

.el-collapse h3{
  width: 100%;
  /* background: red; */
  padding: 0px 0px 0px 20px;
}
.el-collapse h3:hover{
  cursor: pointer;
}

.el-collapse > .is-active-h3{
  border-left: 2px solid #ffa502;
  color: #ffa502;
  height: 30px;
}
</style>
