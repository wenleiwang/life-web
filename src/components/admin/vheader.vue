<template>
    <div class="black_colore">
        <div class="harder_body">
            <h3 class="harder_logo">Wenwen</h3>

            <ul>
                <li v-on:click="management">文章管理</li>
                <li v-on:click="addArticle">新增文章</li>
            </ul>

            <div class="harder_search">
                <li><input type="text"></li>
                <li><img src="@/assets/search.png" alt=""></li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'admin-header',
    data: function(){
        return {
            count : 0
        }
    },
    methods:{
      management: function(event){
        this.$router.replace('/admin/indexList')
      },
      addArticle:function(){
        this.$router.replace('/admin/adminRedact')
      }
    }
}
</script>

<style scoped>
body{
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei;
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

.harder_body > ul{
  margin: 0px;
}

.harder_body > ul > li{
  float: left;
  color: #F1F2F6;
  list-style: none;
  font-size: 18px;
  margin: 25px 20px;
}

.harder_body > ul > li:hover{
    cursor: pointer;
}

.harder_search{
  float: right;
  width: 383px;
  background-color: red;
  margin: 25px 0px 25px auto;
  border: 0px;
  border-radius: 5px;
  
}
.harder_search:hover{
  border: 1px solid #2ED573;
}

.harder_search > li{
  list-style: none;
  float: left;
  height: 23px;
}

.harder_search > li > input{
  width: 350px;
  height: 23px;
  border: 1px;
  padding: 0px;
  margin: 0px;
  border-radius: 3px 0px 0px 3px;
  /* 触发边框颜色 */
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
}

.harder_search > li > img{
  float: left;
  width: 23px;
  height: 23px;
  background-color: #FFFFFF;
  border-radius: 0px 3px 3px 0px;
}
.harder_search > li > img:hover{
  /* 鼠标变成小手 */
  cursor: pointer;
}
</style>