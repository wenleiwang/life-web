<template>
    <el-row :gutter="20" >
        <el-row type="flex" justify="center">
            <el-col :span="20">
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                    fixed
                    prop="addTime"
                    label="日期"
                    width="180">
                    </el-table-column>

                    <el-table-column
                    prop="articleName"
                    label="文章名"
                    width="400">
                    </el-table-column>

                    <el-table-column
                    label="操作"
                    width="100">

                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.articleId)" type="text" size="small">查看</el-button>
                        <el-button @click="updateClick(scope.row.articleId)" type="text" size="small">编辑</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        
        <el-row type="flex" justify="center">
            <el-col :span="16">
                <!--  分页小标-->
                <div class="page_item">
                    <div  class="page_item_float">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[20, 40, 60, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="articleTotal">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-row>

</template>

<script>
import artcleList from '@/components/ArticleList/articleList'
export default {
    data() {
      return {
        tableData: [],
        currentPage: 1,
        articleTotal:0,
        pageSize:20
      }
    },
    components :{
        artcleList
    },
    created (){
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.listArticle()
    },
    watch:{
        // 如果路由有变化，会再次执行该方法
        '$route': 'listArticle'
    },
    methods:{
        listArticle(){
            // 由于 main.js 里全局定义的 axios,此处直接使用 $axios 即可。
            // 由于 main.js 里定义了每个请求前缀，此处的 / 即为http://localhost:2716
            this.axios.get('/admin/listArticle',{
                params:{
                    search : "",
                    pageNum :this.currentPage,
                    pageSize :this.pageSize
                }
            }).then((response) => {
                console.log(response.data)
                if(response.data.Result == 1){
                    this.items = response.data.Data
                    this.tableData = response.data.Data
                    this.articleTotal = response.data.TotalCount
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.listArticle()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.listArticle()
        },
        handleClick(row) {
            var id = row;
            this.$router.push({name : 'seeArticle' , query:{id}})
        },
        updateClick(id){
            this.$router.push({name : 'adminRedact' , query:{id}})
        }
    }
}
</script>

<style scoped>

</style>