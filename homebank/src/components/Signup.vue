<template>
  <div id="signupform">
    <el-form ref="formsignup" :rules="formsignuprules" :model="formsignup" label-width="100px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formsignup.email" type="email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formsignup.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input v-model="formsignup.repassword" type="password" placeholder="请输入确认密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('formsignup')">立即注册</el-button>
        <el-button type="primary" @click="resetForm('formsignup')">清空表单</el-button>
        <el-button @click="onReturn">返回登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'signup',
    components: {},
    data() {
      var checkPass = (rule, value, callback) => {
        if (value != this.formsignup.password) {
          callback(new Error("两次密码输入不一致！"));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        this.axios.get('/signup/' + this.formsignup.email).then((response) => {
          var resp = response.data;
          if (!resp["infostatus"]) {
            callback(new Error(resp["infomsg"]));
          } else {
            callback();
          }
        }).catch((error) => {
        });
      };
      return {
        formsignup: {
          email: "",
          password: "",
          repassword: ""
        },
        formsignuprules: {
          email: [
            {required: true, message: "请输入邮箱！", trigger: 'blur'},
            {type: 'email', message: "请输入正确的邮箱地址！", trigger: 'blur, change'},
            {validator: checkEmail, trigger: 'blur, change'},
          ],
          password: [
            {required: true, message: "请输入密码！", trigger: 'blur'},
            {min: 6, max: 16, message: "密码长度为6到16个字符", trigger: 'blur'},
          ],
          repassword: [
            {required: true, message: "请输入确认密码！", trigger: 'blur'},
            {min: 6, max: 16, message: "确认密码长度为6到16个字符", trigger: 'blur, change'},
            {validator: checkPass, trigger: 'blur, change'},
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var passwordmd5 = md5(this.formsignup.password).slice(0, 30);
            this.axios.post('/signup/',
              {
                "user_password": passwordmd5,
                "user_email": this.formsignup.email
              }
            ).then((response) => {
              var resp = response.data;
              this.$message({
                showClose: true,
                message: resp["infomsg"],
                onClose: resp["infostatus"] ? this.onReturn : null
              });
            }).catch((error) => {
            });
          }
        });
      },
      onReturn() {
        this.$router.push({name: 'login'});
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #signupform {
    margin-top: 100px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
