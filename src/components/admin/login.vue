<template>
  <body id="poster">
    <el-form class="login-container" label-position="left"
             label-width="0px">
      <h3 class="login_title">系统登录</h3>
      <el-form-item>
        <el-input type="text" v-model="loginForm.username"
                  auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password"
                  auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="loginMethod">登录</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
import {login} from '../../api'
  export default {
    name: 'Login',
    data () {
      return {
        loginForm: {
          username: 'admin',
          password: '123'
        },
        responseResult: []
      }
    },
    methods: {
      async loginMethod () {
        const user = await login({'loginName':this.loginForm.username,'userPassword':this.loginForm.password})
        if(user.Result === 1){
          // 登录成功，保存用户信息
          this.$message({
            message: '登录成功！',
            type: 'success'
          });
          // 保存到Vuex
          this.$store.dispatch('login',user.Data)
          // 跳转
          this.$router.replace('/admin/indexList')
        }else{
          // 弹框失败
          this.$message({
            message: '登录失败，原因：'+user.Message,
            type: 'warning'
          });
        }

      }
    }
  }
</script>

<style>
  #poster {
    background:url("../../assets/back_login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

</style>

