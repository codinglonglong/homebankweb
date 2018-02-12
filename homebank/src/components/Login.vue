<template>
  <div id="loginform">
    <el-form ref="formlogin" :rules="formloginrules" :model="formlogin" label-width="100px">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formlogin.email" type="email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formlogin.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('formlogin')">立即登陆</el-button>
        <el-button @click="onSignup">前往注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import md5 from 'js-md5';
  export default {
    name: 'login',
    components: {},
    data() {
      return {
        formlogin: {
          email: '',
          password: '',
        },
        formloginrules: {
          email: [
            {required: true, message: "请输入邮箱！", trigger: 'blur'},
          ],
          password: [
            {required: true, message: "请输入密码！", trigger: 'blur'},
          ]
        }
      }
    },
    created(){
      var user_email = this.$cookie.get("user_email");
      var user_password = this.$cookie.get("user_password");
      if (user_email && user_password) {
        this.axios.post('/login/',
          {
            "user_password": user_password,
            "user_email": user_email
          }
        ).then((response) => {
          var resp = response.data;
          if (resp["infostatus"]) {
            this.$cookie.set("user_token", resp["inforesult"]);
            this.$router.push({name: 'mainview'});
          }
          else {
            this.$message({
              showClose: true,
              message: resp["infomsg"],
            });
          }
        }).catch((error) => {
        });
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var passwordmd5 = md5(this.formlogin.password).slice(0, 30);
            this.axios.post('/login/',
              {
                "user_password": passwordmd5,
                "user_email": this.formlogin.email
              }
            ).then((response) => {
              this.$cookie.set("user_email", this.formlogin.email);
              this.$cookie.set("user_password", passwordmd5);
              var resp = response.data;
              if (resp["infostatus"]) {
                this.$cookie.set("user_token", resp["inforesult"]);
                this.$router.push({name: 'mainview'});
              }
              else {
                this.$message({
                  showClose: true,
                  message: resp["infomsg"],
                });
              }
            }).catch((error) => {
            });
          }
        });
      },
      onSignup() {
        this.$router.push({name: 'signup'});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #loginform {
    margin-top: 100px;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
