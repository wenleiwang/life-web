<template>
  <div id="app">

    <div class="black_colore">
      <div class="harder_body">
        <div class="harder_logo">Wenwen</div>

        <ul>
          <li>首页</li>
          <li>分类</li>
          <li>归档</li>
          <li>关于我</li>
        </ul>

        <div class="harder_search">
          <li><input type="text"></li>
          <li><img src="./assets/search.png" alt=""></li>
        </div>
      </div>
    </div>


    <div class="content_body">
      <div class="content_pic">这里是pic</div>
      <div class="blog_content">

        <div class="article_item">
          <div class="article_content">
            <button>原创</button>
            <h3>java的进阶</h3>
            <p>人总是要有些奋斗的目标的,暂且以此篇作为我而后一年的开端,思索一下接下去的学习之路。 </p>
            <div class="article_info">
              <img src="./assets/header001.jpg" alt="">
              <p>文文</p>
              <p>2020-11-14</p>
              <img src="./assets/see.png" alt="">
              <p>121</p>
            </div>
          </div>
          <div class="article_pic">
            <img src="./assets/header001.jpg" alt="">
          </div>
        </div>

        <div class="article_item">
          <div class="article_content">
            <button>原创</button>
            <h3>java的进阶</h3>
            <p>人总是要有些奋斗的目标的,暂且以此篇作为我而后一年的开端,思索一下接下去的学习之路。 </p>
            <div class="article_info">
              <img src="./assets/header001.jpg" alt="">
              <p>文文</p>
              <p>2020-11-14</p>
              <img src="./assets/see.png" alt="">
              <p>121</p>
            </div>
          </div>
          <div class="article_pic">
            <img src="./assets/header001.jpg" alt="">
          </div>
        </div>


        <div class="article_item">
          <div class="article_content">
            <button>原创</button>
            <h3>java的进阶</h3>
            <p>人总是要有些奋斗的目标的,暂且以此篇作为我而后一年的开端,思索一下接下去的学习之路。 </p>
            <div class="article_info">
              <img src="./assets/header001.jpg" alt="">
              <p>文文</p>
              <p>2020-11-14</p>
              <img src="./assets/see.png" alt="">
              <p>121</p>
            </div>
          </div>
          <div class="article_pic">
            <img src="./assets/header001.jpg" alt="">
          </div>
        </div>


        <div class="article_item">
          <div class="article_content">
            <button>原创</button>
            <h3>java的进阶</h3>
            <p>人总是要有些奋斗的目标的,暂且以此篇作为我而后一年的开safd端,思索一下接下去的学习之路。
              人sfdasdvas斗的目标的,暂且以此篇作为我而后一年afsdfasdf的开端,思索一下接下去的学习之路。
              人总是要有些奋斗的目标的,fasdf,思索一下接下去的学习之路。
               </p>
            <div class="article_info">
              <img src="./assets/header001.jpg" alt="">
              <p>文文</p>
              <p>2020-11-14</p>
              <img src="./assets/see.png" alt="">
              <p>121</p>
            </div>
          </div>
          <div class="article_pic">
            <img src="./assets/header001.jpg" alt="">
          </div>
        </div>

      </div>

      <div class="article_list">list</div>
    </div>

    <div class="black_colore black_footer">
    </div>
  </div>


</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0px;
}

.black_colore{
  background: #2c3e50;
  width: 100%;
  height: 70px;
}

.harder_body{
  margin: 0px auto -357px;
  width: 70%;
  height: 100%;
  min-height: 100%;
}
.harder_logo{
  color: #2ED573;
  font-family: Cambria Math;
  font-size: 32px;
  line-height: 35px;
  margin: 20px auto;
  font-weight: bold;
  float: left;
  text-shadow: 2px 2px 1px #000000;
}

.harder_body > ul > li{
  float: left;
  color: #F1F2F6;
  list-style: none;
  font-size: 18px;
  margin: 25px 20px;
}

.harder_search{
  float: right;
  width: 30%;
  background-color: red;
  margin: 25px 0px 25px auto;
  border: 0px;
  
}

.harder_search > li{
  list-style: none;
  float: left;
}

.harder_search > li > input{
  width: 350px;
  float: left;
  height: 18px;
}

.harder_search > li > img{
  float: left;
  width: 23px;
  height: 23px;
  background-color: #FFFFFF;
}

.content_body{
  margin: 5px auto;
  width: 70%;
  height: 100%;
}

.content_pic{
  margin: 0px auto;
  /* width: 809px; */
  width: 100%;
  _height: 500px;
  min-height: 500px;
  background-image: url(./assets/002.jpg);
  background-size: 100% 100%;
  border-radius: 10px ;
  filter : progid:DXImageTransform.Microsoft.AlphaImageLoader ( enabled=bEnabled , sizingMethod=sSize , src=sURL )
}

.blog_content{
  margin: 5px auto;
  width: 70%;
  height: 100%;
  float: left;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px #a4b0be;
  padding: 0px 10px 0px 10px;
}

.article_item{
  width: 100%;
  margin: 10px auto;
  float: left;
}

.article_content > button{
  background-color: #FF4757;
  font-size: 10px;
  border-radius: 2px;
  padding: 5px;
  border: 0px;
  color: #FFFFFF;
  margin: 0px 5px 0px 0px;
  float: left;
}

.blog_content h3{
  font-size: 18px;
  font-family: Microsoft YaHei;
  color: #2F3542;
  margin: 0px auto 0px 10px;
}

.blog_content > p{
  color: #57606F;
  font-family: Microsoft YaHei;
  font-size: 14px;
}
.article_info{
  margin: 0px auto;
}

.article_info > p{
  color: #747D8C;
  font-family: Microsoft YaHei;
  font-size: 12px;
  float: left;
  margin: 0px 2px;
  padding: 0px;
}

.article_info > img{
  margin: 2px 0px 2px 0px;
  float: left;
  width: 12px;
  height: 12px;
  border-radius: 12px;
}

.article_content{
  float: left;
  margin: 0px auto;
  width: 70%;
}
.article_pic{
  float: left;
}

.article_pic > img{
  border-radius: 5px;
  width: 150px;
  height: 92px;
}

.article_list{
  margin: 5px;
  float: right;
  width: 27%;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 1px 1px 5px#a4b0be;
  padding: 10px;
}

.black_footer{
  height: 357px;
  float: left;
  margin: 10px auto 0px auto;
}
</style>
