<template>
    <div>
        <Vheader></Vheader>
        <div>
            <table>
                <tr>
                    <th >文章1</th>
                    <th class="opteration">操作</th>
                </tr>
                <tr v-for="item in items" :key="item.id">
                    <td>{{item.articleName}}</td>
                    <td class="opteration">
                        <li>编辑</li>
                        <li>删除</li>
                        <li>发布</li>
                    </td>
                </tr>
            </table>
        </div>
        <button v-on:click="test">test</button>
    </div>

</template>
<script>
import Vheader from './vheader.vue'
// import Vfooter from './vfooter'
    export default {
        data () {
            return {
                msg: "",
                items : []
            }
        },
        components:{
            Vheader,
            // Vfooter
        },
        watch:{
            //to表示即将要进入的那个组件，from表示从哪个组件过来的
            $route(to,from){
                this.msg = to.params.name
                console.log(111);
            }
        },
        methods :{
            test:function(){
                // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
                // 由于 main.js 里定义了每个请求前缀，此处的 / 即为http://localhost:2716
                this.$axios.get('/listArticle',{
                    params:{
                        search : "",
                        pageNum :1,
                        pageSize :10
                    }
                }).then((response) => {
                    console.log(response.data)
                    if(response.data.Result == 1){
                        this.items = response.data.Data
                    }
                })
            }
        }
    }
</script>

<style scoped>
/* table{
    margin: 10px auto;
    width: 80%;
    height: 100px;
    font-size: 13px;
    border: 1px solid red;
    color: #666;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    flex: 1;
    max-width: 100%;
    background-color: #fff;
} */
/* table{ 
    margin: 10px auto;
    width: 80%;
    min-height: 25px;
    line-height: 25px;
    text-align: center;
    border:1px solid #ccc;
    border-collapse: collapse;
} 
tr {
    border: 1px solid red;
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
} */
table tr th, table tr td {
    border:1px solid #ccc; 
}
table {
    margin: 10px auto;
    width: 70%;
    text-align: center;
    border-collapse: collapse;
} 
.opteration{
    width: 200px;
}
table li{
    list-style: none;
}
</style>