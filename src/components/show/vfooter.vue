<template>
    <div class="black_colore black_footer">
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-row type="flex" justify="center">
            <el-col :xs="12" :sm="5" :md="6" :lg="6" :xl="6" class="footer-li">
              <img src="../../assets/header001.jpg" alt="">
              <h3><router-link to="/admin/index">个人公众号</router-link></h3>
            </el-col>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" class="footer-li">
              <h3>我的站外链接</h3>
              <p>CSDN:<a href="https://blog.csdn.net/weixin_42119415">文文的博客</a></p>
            </el-col>
            <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" class="footer-li">
              <h3>联系我</h3>
              <p>Email:wenleiwang@126.com</p>
              <p>QQ:1052833104</p>
            </el-col>
            <el-col :xs="0" :sm="7" :md="6" :lg="6" :xl="6" class="footer-li">
              <h3>文文</h3>
              <p>性格开朗，恪守勤勉，礼仪仁孝，</p>
              <p>坚毅勇敢，敏而好学，谦虚明理。</p>
              <p>校训：博学躬行、尚志明德</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

</template>

<script>
export default {
    name: 'vfooter',
    data: function(){
        return {
            count : 0
        }
    }
}
</script>

<style scoped>
.black_colore{
  background: #2c3e50;
  width: 100%;
  height: 70px;
}
.black_footer{
  height: 357px;
  float: left;
  margin: 10px auto 0px auto;
}

.footer-li > img{
  height: 104px;
  width: 104px;
  background-size: 100% 100%;
}
.footer-li > p{
  font-size: 14px;
  color: #A4B0BE;
}
.footer-li a{
  font-size: 14px;
  color: #A4B0BE;
}
.footer-li > h3{
  color: #CED6E0;
  font-size: 18px;
  font-family: Microsoft YaHei;
}
.footer-li{
  /* background: chartreuse; */
  margin: 70px auto;
  text-align: center;
  border-right: 1px solid #CED6E0;
}
.footer-no-right{
  border-right: 0px;
}
.footer-no-left{
  border-left: 0px;
}
</style>