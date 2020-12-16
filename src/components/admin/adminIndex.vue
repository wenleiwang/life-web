<template>
    <div>
        <h1>user</h1>
       <!-- 这里可以通过$route.params.name来获取路由的参数 -->
        <p>欢迎回来,{{$route.params.name}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: ""
            }
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