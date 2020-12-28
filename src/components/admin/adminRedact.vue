<template>
    <div>
        <div class="leftMenu">
            <li>保存</li>
            <li>预览</li>
            <li @click="updateArticle">发布</li>
        </div>

        <div id="editor">
            <div>
                <p>文章标题</p>
                <input type="text" v-model="push.articleName">
            </div>
            <!-- <mavon-editor style="height: 100%"></mavon-editor> -->
            <mavon-editor v-model="push.articleBody" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" />
        </div>
        <div>{{push.articleBody}}</div>

    </div>
</template>

<script>

export default {
    name: 'editor',
    data(){
        return {
            push:{
                articleBody: "",
                articleDescription: "",
                articleFlag: 0,
                articleId: 0,
                articleImgUrl: "",
                articleName: "",
                classifyIdList: [
                    0
                ],
                collectStatus: true,
                commentStatus: true,
                starStatus: true
            }
        }
    },
    components: {
        // mavonEditor
        // or 'mavon-editor': mavonEditor
    },
    methods : {
        imgAdd (pos, $file) {
            let formdata = new FormData()
            formdata.append('file', $file)
            this.$axios({
               url: '/file/upload',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' ,
                'aaa':'aaa'
               },
           }).then((url) => {
               // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            //    this.$vm.$img2Url(pos, url.data);
               this.$refs.md.$img2Url(pos, url.data);
           })
        },
        imgDel (pos) {
            delete this.imgFile[pos]
        },
        updateArticle(){
            alert("点击了")
            this.$axios({
                url :'/admin/updateArticle',
                method : 'post',
                data: this.push,
                headers:{
                    'user_info': 1
                }
            }).then((url) => {
                if(url.data.Result == 1){
                    alert(url.data.Message)
                }else{
                    alert(url.data.Message)
                }
            })
        }

    }
}
</script>

<style scoped>
.leftMenu{
    float: left;
    height: 100%;
}
#editor {
        margin: auto;
        padding: 10px auto;
        width: 70%;
        height: 100%;
    }
</style>