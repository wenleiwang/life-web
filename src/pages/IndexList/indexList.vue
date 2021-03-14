<template>
  <div>
    <div class="userModule">
      <el-breadcrumb class="navigation" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin/indexList' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

        <el-dropdown class="head_img" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar  :size="40" :src="circleUrl"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
      </el-dropdown>
      
    </div>

    <div class="content">
      <el-image class="content_img"
        :src="url"
        fit="cover"></el-image>

        <ul>
          <li>文章数量<br/>50</li>
          <li>标签数量<br/>100</li>
          <li>收藏数量<br/>200</li>
          <li>访客数量<br/>300</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        circleUrl: "https://avatars.githubusercontent.com/u/39472071?s=400&u=b68f9c21f2029090a2b5a0f01397372ec70af94e&v=4",
        url: 'http://img.poesy.ink/20190926081202.jpg'
      }
    },
    methods:{
      handleCommand(command) {
        if(command === 'exit'){
          this.$store.dispatch('exitUser');
          this.$message({message:'登出成功！',type:'success'});
          this.$router.push('/login')
        }
      }
    }
}
</script>

<style scoped>
.userModule{
  border-bottom: 1px solid #dfe4ea;
  height: 60px;
}

.navigation{
  float: left;
  margin: 22px;
  font-size: 16px;
}
.head_img{
  float: right;
  margin: 10px 20px;
}

.content{
  width: 90%; 
  margin: 10px auto;
}
.content_img{
  width: 100%;
  height: 600px;
  border-radius: 5px;
}
.content > ul {
  width: 100%;
  margin: 10 auto;
  height: 100%;
  padding: 0;
}

.content > ul > li{
  box-sizing: border-box;
  width: 23%;
  list-style: none;
  float: left;
  text-align: center;
  line-height: 50px;
  color: #ffffff;
  background: #7bed9f;
  border-radius: 5px;
  margin: 0 1%;
}
</style>