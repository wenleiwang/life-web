<template>
  <el-row  type="flex" justify="center">
    <el-col :span="18">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign" :rules="rules" >
        <el-row  :gutter="20">
          <el-col :span="14">
            
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="formLabelAlign.userName"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="realName">
              <el-input v-model="formLabelAlign.realName"></el-input>
            </el-form-item>
            <el-form-item label="虚拟年龄" prop="userAge">
              <el-input v-model="formLabelAlign.userAge"></el-input>
            </el-form-item>
            <el-form-item label="真实年龄" prop="realAge">
              <el-input v-model="formLabelAlign.realAge"></el-input>
            </el-form-item >
              <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
            
          </el-col>
          <el-col :span="6">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formLabelAlign.userImg" :src="formLabelAlign.userImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <el-image
              style="width: 100%;"
              :src="formLabelAlign.userImg"
              fit="cover"></el-image> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data() {
      return {
        formLabelAlign: {
          userName: '',
          realName: '',
          userAge: '',
          realAge:'',
          email:'',
          userImg:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        rules: {
          userName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          email:[
            { required: false, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formLabelAlign) {
        this.$refs[formLabelAlign].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formLabelAlign) {
        this.$refs[formLabelAlign].resetFields();
      }
    }
}
</script>

<style scoped>
.el-col{
  margin: 30px auto;
}

.el-upload {
  border: 1px solid red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  /* background: yellow; */
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>