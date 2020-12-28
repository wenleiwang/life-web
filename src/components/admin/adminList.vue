<template>
    <div>
        <!-- <Vheader></Vheader> -->
        <div>
            <table>
                <tr>
                    <td>文章1</td>
                    <td>
                        <li>修改</li>
                        <li>删除</li>
                    </td>
                </tr>
                <tr>
                    <td>文章2</td>
                    <td>
                        <li>修改</li>
                        <li>删除</li>
                    </td>
                </tr>
            </table>
        </div>
        <!-- <Vfooter></Vfooter> -->
    </div>

</template>
<script>
// import Vheader from '../vheader.vue'
// import Vfooter from '../vfooter'
    export default {
        data () {
            return {
                msg: ""
            }
        },
        components:{
            // Vheader,Vfooter
        },
        watch:{
            //to表示即将要进入的那个组件，from表示从哪个组件过来的
            $route(to,from){
                this.msg = to.params.name
                console.log(111);
            }
        }
    }
</script>

<style scoped>
table{
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
}
tr {
    border: 1px solid red;
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}
</style>