<template>
    <div>
        <h1>page2</h1>
        <p>{{msg}}</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: "我是page2组件"
            }
        },
        methods:{
            goBack() {
                window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/page1')
            }
        }
    }
</script>