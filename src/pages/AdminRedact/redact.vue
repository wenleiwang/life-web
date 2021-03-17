<template>
    <div class="bg-grid">
        <div class="leftMenu">
            <el-button icon="el-icon-search" circle @click="seeArticle">预览</el-button>
            <br/>
            <br/>
            <el-button type="success" icon="el-icon-check" circle @click="updateArticle">发布</el-button>
            <br/>
            <br/>
            <el-button type="info" icon="el-icon-message" circle @click="returenArticleList">返回</el-button>
        </div>

        <div id="editor">
            <el-form ref="form" :inline="true" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input autosize v-model="push.articleName"></el-input>
                </el-form-item>
                <el-form-item label="文章首图">
                    <el-input autosize v-model="push.articleImgUrl" ></el-input>
                </el-form-item>
                <div class="editorBody">
                    <mavon-editor class="editorHeight" v-model="push.articleBody" ref="md" @imgAdd="imgAdd" @imgDel="imgDel" />
                </div>
                <el-form-item label="文章类型">
                    <el-select v-model="push.articleFlag" placeholder="请选择文章类型">
                        <el-option label="原创" :value="0"></el-option>
                        <el-option label="转载" :value="1"></el-option>
                        <el-option label="翻译" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-autocomplete
                      class="inline-input"
                      v-model="push.classifyName"
                      placeholder="请选择文章分类"
                      :fetch-suggestions="classifySearch"
                      @select="classifySelect">
                    </el-autocomplete>
                </el-form-item>
                <br/>

                <el-form-item label="文章标签">
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{tag}}</el-tag>
                        <el-autocomplete
                            class="inline-input"
                            v-if="inputVisible"
                            v-model="inputValue"
                            ref="saveTagInput"
                            size="small"
                            :fetch-suggestions="querySearch"
                            @select="handleSelect"
                            @keyup.enter.native="handleInputConfirm"
                            @visible-change="handleInputConfirm"
                        ></el-autocomplete>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
                <br/>
                <el-form-item label="开启收藏">
                    <el-switch v-model="push.collectStatus" active-color="#13ce66"></el-switch>
                </el-form-item>
                <el-form-item label="开启评论">
                    <el-switch v-model="push.commentStatus" active-color="#13ce66"></el-switch>
                </el-form-item>
                <el-form-item label="开启点赞">
                    <el-switch v-model="push.starStatus" active-color="#13ce66"></el-switch>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {upload,updateArticle} from '../../api'
export default {
    name: 'editor',
    data(){
        return {
            push:{
                articleBody: "",
                articleDescription: "",
                articleFlag: '',
                articleId: 0,
                articleImgUrl: "",
                articleName: "",
                classifyName: '',
                tagIdList:[],
                collectStatus: true,
                commentStatus: true,
                starStatus: true,
                deleted : 0,
            },
            inputVisible: false,
            inputValue: '',
            restaurants: [],
            dynamicTags:[],
            listClassify:[]
        }
    },
    created () {
        this.loadAll();
        this.getArticle()
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'getArticle'
    },
    components: {
        // mavonEditor
        // or 'mavon-editor': mavonEditor
    },
    methods : {
         async imgAdd (pos, $file) {
            let formdata = new FormData()
            formdata.append('file', $file)
            const result = await upload(formdata)
            if(result != null){
                // 上传成功
                console.log(result)
                this.$refs.md.$img2Url(pos, result);
            }else{
                // 上传失败
                this.$message({
                    message: '上传失败',
                    type: 'warning'
                });
            }
        },
        imgDel (pos) {
            delete this.imgFile[pos]
        },
        async updateArticle(){
            this.push.deleted=0

            this.push.tagIdList.forEach((item) => {
                var tagName
                this.restaurants.forEach(
                   (tag) => {
                        if(item == tag.tagId){
                            tagName = tag.tagName
                        }
                   }
                )
                if(this.dynamicTags.indexOf(tagName) === -1){
                    var index = this.push.tagIdList.indexOf(item);
                    if (index > -1) {
                        this.push.tagIdList.splice(index, 1);
                    }
                }
            })
            this.dynamicTags.forEach((item => {
                var id
                this.restaurants.forEach(
                   (tag) => {
                        if(item == tag.tagName){
                            id = tag.tagId
                        }
                   }
                )

                if(this.push.tagIdList.indexOf(id) === -1){
                    this.push.tagIdList.push(id)
                }
            }))
            const result = await updateArticle(this.push);
            if(result != null && result.Result === 1){
                this.$message({
                    message: '发布成功！',
                    type: 'success'
                });
            }else if(result != null){
                this.$message({
                    message: '发布失败，原因：'+result.Message,
                    type: 'warning'
                });
            }else{
                this.$message({
                    message: '发布失败!',
                    type: 'error'
                });
            }
            // this.$axios({
            //     url :'/admin/updateArticle',
            //     method : 'post',
            //     data: this.push
            // }).then((url) => {
            //     if(url.data.Result == 1){
            //         alert(url.data.Message)
            //         this.push.articleId = url.data.Data
            //     }else{
            //         alert(url.data.Message)
            //     }
            // })
        },
        seeArticle(){
            this.push.deleted=2

            this.push.tagIdList.forEach((item) => {
                var tagName
                this.restaurants.forEach(
                   (tag) => {
                        if(item == tag.tagId){
                            tagName = tag.tagName
                        }
                   }
                )
                if(this.dynamicTags.indexOf(tagName) === -1){
                    var index = this.push.tagIdList.indexOf(item);
                    if (index > -1) {
                        this.push.tagIdList.splice(index, 1);
                    }
                }
            })
            this.dynamicTags.forEach((item => {
                var id
                this.restaurants.forEach(
                   (tag) => {
                        if(item == tag.tagName){
                            id = tag.tagId
                        }
                   }
                )

                if(this.push.tagIdList.indexOf(id) === -1){
                    this.push.tagIdList.push(id)
                }
            }))
            this.axios({
                url :'/admin/updateArticle',
                method : 'post',
                data: this.push
            }).then((url) => {
                if(url.data.Result == 1){
                    this.push.articleId = url.data.Data
                    var id = this.push.articleId
                    this.$router.push({name : 'seeArticle' , query:{id}})
                }else{
                    alert(url.data.Message)
                }
            })
            
        },

        classifySearch(queryString, cb) {
            var restaurants = this.listClassify;
            var results = queryString ? restaurants.filter(this.createClassifyFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createClassifyFilter(queryString) {
            return (listClassify) => {
            return (listClassify.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        classifySelect(item){
            this.push.classifyName = item.value
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        querySearch(queryString, cb) {
            var restaurants = [];
            this.restaurants.forEach((item) =>{
                var str = {value:item.tagName,id:item.tagId}
                restaurants.push(str);
            })

            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString) === 0);
            };
        },
        loadAll(){
            document.cookie="user_info=1;path = /"
            this.axios({
                url :'/admin/listClassify',
                method : 'get'
            }).then((url) => {
                if(url.data.Result == 1){
                    url.data.Data.forEach((item) => {
                        var classify = {value:item.classifyName}
                        this.listClassify.push(classify)
                    })
                }else{
                    alert(url.data.Message)
                }
            })
            this.axios({
                url :'/admin/listTag',
                method : 'get'
            }).then((url) => {
                if(url.data.Result == 1){
                    this.restaurants = url.data.Data
                }else{
                    alert(url.data.Message)
                }
            })
        },
        handleSelect(item) {
            if (item) {
                this.dynamicTags.push(item.value);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if(!inputValue){
                this.inputVisible = false;
                this.inputValue = '';
            }else if (this.restaurants.indexOf(inputValue) === 0) {
                this.dynamicTags.push(inputValue);
                this.inputVisible = false;
                this.inputValue = '';
            }else{
                this.$confirm('-->'+inputValue + '<-- 标签不在已知标签哟, 是否创建标签?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 调用创建接口
                    this.axios.get('admin/updateTag',{
                        params:{
                            tagName : inputValue
                        }
                    }).then((url) => {
                        this.dynamicTags.push(inputValue);
                        this.inputVisible = false;
                        this.inputValue = '';
                        this.loadAll();
                        this.$message({
                            type: 'success',
                            message: '标签创建成功!'
                        });
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: '标签创建失败!'
                        });
                    })
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消创建分类'
                    });          
                });
            }
            
        },
        addInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        returenArticleList(){
            this.$router.push({ name: 'indexList' })
        },
        getArticle() {
            
            if(this.$route.query.id != null && this.$route.query.id != ''){
                // 去后端获取数据
                this.axios.get('/getArticle',{
                    params:{
                        articleId : this.$route.query.id
                    }
                }).then((url) => {
                    if(url.data.Result == 1){
                        this.push.articleBody = url.data.Data.articleBody
                        this.push.articleDescription = url.data.Data.articleDescription
                        this.push.articleFlag = url.data.Data.articleFlag
                        this.push.articleId = url.data.Data.articleId
                        this.push.articleImgUrl = url.data.Data.articleImgUrl
                        this.push.articleName = url.data.Data.articleName
                        this.push.classifyName = url.data.Data.classifyName
                        if(url.data.Data.tagIdList != null){
                            this.push.tagIdList = url.data.Data.tagIdList
                            this.axios.post('/admin/listTagNameByTagId',url.data.Data.tagIdList).then((overTag) => {
                                overTag.data.Data.forEach((item) =>{
                                    this.dynamicTags.push(item.tagName)
                                })
                            })
                        }
                        this.push.collectStatus = url.data.Data.collectStatus
                        this.push.commentStatus = url.data.Data.commentStatus
                        this.push.starStatus = url.data.Data.starStatus
                        this.push.deleted  = url.data.Data.deleted
                    }else{
                        alert(url.data.Message)
                    }
                })
            }
        },
        stateFormatter(row){// 0-待提审;1-待审核;2-已驳回;3-已审核; ,
          switch(row.auditState){
            case 0:
              return "原创"
              break;
            case 1:
              return "转载"
              break;
            case 2:
              return "翻译"
              break;
            default:
          }
        },
    }
}
</script>

<style scoped>
.leftMenu{
    float: right;
    height: 100%;
    position: absolute;
    right: 50px;
}
#editor {
    margin: 20px auto;
    padding: 10px auto;
    width: 70%;
    height: 100%;
}
.editorBody{
    margin: 0px auto 40px;
    margin-left: 35px;
}

.bg-grid {
    /* height: 1000px; */
    padding: 10px;
    padding-top: 64px;
    background-color: #efefef;
    background-image:   linear-gradient(#e7e6e6 1px, transparent 0),
                        linear-gradient(90deg, #e7e6e6 1px, transparent 0);
    background-size: 21px 21px, 21px 21px;
    background-position: center;
}

.bg-grid:before,
.bg-grid:after{
    content: '';
    position: absolute;
    z-index: 0;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    background-color: #fff;
    height: 28px;
    box-shadow: 68px 0 0 0 #fff, 
                calc(68px * 2) 0 0 0 #fff, 
                calc(68px * 3) 0 0 0 #fff, 
                calc(68px * 4) 0 0 0 #fff, 
                calc(68px * 5) 0 0 0 #fff, 
                -68px 0 0 0 #fff, 
                calc(68px * -2) 0 0 0 #fff, 
                calc(68px * -3) 0 0 0 #fff, 
                calc(68px * -4) 0 0 0 #fff, 
                calc(68px * -5) 0 0 0 #fff;
}
.bg-grid:before {
    top: 0;
    width: 10px;
}

.bg-grid:after {
    top: 26px;
    width: 28px;
    border-radius: 50%;
}
.editorHeight {
    height: 600px;
}
.el-tag + .el-tag {
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>