<template>
  <div id="seeArticle">
    <div class="inner">
        <div class="opt">
            <li>展示</li>
            <li>操作1</li>
            <li>操作2</li>
            <li>操作3</li>
        </div>
        <div class="markedArticle" v-html="markedDownContent"></div>
        <div class="toc"></div>
    </div>
  </div>
</template>

<script>
//引入marked
import marked from 'marked'
export default {
  name: 'seeArticle',
  data(){
      return {
          article :'# 表头\n发哦围殴价格奇偶艾灸馆饿哦批国家党纪国法基地解耦ID随机发诶见Aug地方见哦按文件佛角色的发覅按实际佛配件费\n ## 二级标题 \n发哦围殴价格奇偶艾灸馆饿哦批国家党纪国法基地解耦ID随机发诶见Aug地方见哦按文件佛角色的发覅按实际佛配件费\n  ## 二级标题\n发哦围殴价格奇偶艾灸馆饿哦批国家党纪国法基地解耦ID随机发诶见Aug地方见哦按文件佛角色的发覅按实际佛配件费\n'
          + '### 三级表头\n 王I偶尔放就爱我耳机佛安静的生命力尖顶坡is阿福讲坡地撒酒疯金佛isad见覅王府井收到附件噢埃及危废间事件发酵粉啊代理商卡机覅偶瓦基弗第十六届发那温梦飞你我安静覅额阿瓦飓风破念完经jfiawjfasdjf叫法你手机发生的浪费那里扣为加法代收款发送了看得见风和收到附件阿拉善地方萨拉快递费家乐鸡粉立刻就散发静安寺两地分居机房都市发送了看得见风及发讲道理会计法我爱神的箭覅家搜我机房都市见覅诉法时代峻峰爵迹二发静安寺父级偶爱就偶尔跑完建安费dfa发件地设计费as绝地反击让肌肤的萨克金佛哪位分类的设计啊分辣椒粉ID就安居房吉尔斯年纪大了安防姐啊司法局额'
          + '\n ### 三级标题 \n 我IE费劲儿欧塞机房沙发丢件而爱上饭交罚金是代理费我飓风破娭毑\n\n -----\n fawijefioasjdfjaisjdfpoijas\n '
// +'```java\n'+
// 'public ResponseBase updateArticle(@RequestBody ArticleRequest article){'+
//         'UserInfo userContext = UserContext.getUserContext();'+
//         'if(userContext == null){'+
//             'return new ResponseBase().fail("用户登录失败，请重新登录！");'+
//         '}'+
//         'return adminArticleService.updateArticle(article,userContext);'+
//     '}\n'+
// '```\n '
      }
  },
    //增加计算属性
    computed:{
        markedDownContent:function(){
        return marked(this.article)
        }
    },
  methods: {
    // getMardownFileContent(article) {
    //     //处理markdown数据，data为markdown文件读出的字符串
    //     this.readmeContent = marked(data || '', {
    //         sanitize: true
    //     }); 
    // }
  },
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
  font-family: Microsoft YaHei;
  background: #f1f2f6;
  box-sizing: border-box;
}
.seeArticle{
    width:100%;
    
}
.inner{
    
    width: 90%;
    margin: 20px auto;
}
.opt{
    float: left;
    width: 10%;
}
.markedArticle{
    background: #ffffff;
    width: 60%;
    border-radius: 1em;
    padding: 20px;
    margin: 0 0 0 100px;
    float: left;
}
.toc{
    width: 20%;
    height: 200px;
    background: red;
    border-radius: 1em;
    margin: 0 0 0 20px;
    float: left;
}

</style>
