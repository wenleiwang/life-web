<template>
    <div class="black_colore black_footer">
      <ul>
        <li>
          <img src="../../assets/header001.jpg" alt="">
          <h3><router-link to="/admin/index">个人公众号</router-link></h3>
        </li>
        <li>
          <h3>我的站外链接</h3>
          <p>CSDN:<a href="https://blog.csdn.net/weixin_42119415">文文的博客</a></p>
        </li>
        <li>
          <h3>联系我</h3>
          <p>Email:wenleiwang@126.com</p>
          <p>QQ:1052833104</p>
        </li>
        <li>
          <h3>文文</h3>
            <p>性格开朗，恪守勤勉，礼仪仁孝，</p>
            <p>坚毅勇敢，敏而好学，谦虚明理。</p>
            <p>校训：博学躬行、尚志明德</p>
          </li>
      </ul>
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

.black_footer > ul{
  margin: 70px auto;
  width: 960px;
  height: 200px;
  border-bottom: 1px solid #797979;
}

.black_footer > ul > li{
  position: relative;
  list-style: none;
  float: left;
  height: 150px;
  width: 240px;
  text-align: center;
}

.black_footer > ul > li > img{
  height: 104px;
  width: 104px;
  background-size: 100% 100%;
}

.black_footer > ul > li > h3{
  color: #CED6E0;
  font-size: 18px;
  font-family: Microsoft YaHei;
}
.black_footer > ul > li > p{
  font-size: 14px;
  color: #A4B0BE;
}
</style>