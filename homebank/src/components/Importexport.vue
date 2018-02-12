<template>
  <div class="importexport">
    <Navigator defaultActive="importexport"></Navigator>
    <div class="content">
      <div class="line">
        <el-button type="success" @click="exportdata()" style="width: 200px;">导出账目到Excel文件</el-button>
      </div>
      <div class="line">
        <div class="uploaddiv">
          <el-upload action="" :before-upload="submitForm">
            <el-button type="danger"  style="width: 200px;">从Excel文件初始化数据库</el-button>
          </el-upload>
          <!--<input class="uploadbutton" name="file" type="file" accept="application/vnd.ms-excel" @change="submitForm($event)"/>-->
        </div>
        <span style="color: #FF4949;">（危险，此操作仅适用于初始化账目，完成操作后，当前账户的所有数据都将被删除。）</span>
      </div>
    </div>
  </div>
</template>

<script>
  import Navigator from '../components/Navigator'
  import {filehost, fileport} from '../conf'
  import {backendhost, backendport} from "../conf";
  import ElUpload from "element-ui/packages/upload/src/index";

  export default {
    name: 'importexport',
    components: {
      ElUpload,
      Navigator,
    },
    methods: {
      exportdata(){
        var user_token = this.$cookie.get("user_token");
        this.axios.get("/account/export/" + user_token).then((response) => {
          var resp = response.data;
          if(resp["infostatus"]) {
            var downloadurl = "http://" + filehost + ":" + fileport + resp["inforesult"];
            window.location.href = downloadurl;
          }else{
            this.$message({
              showClose: true,
              message: resp["infomsg"]
            });
          }
        }).catch((error) => {
        });
      },
      submitForm(file) {
        let formData = new FormData();
        formData.append('file', file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.axios.post('/account/import/'+this.user_token, formData, config).then((response) => {
          var resp = response.data;
          this.$message({
            showClose: true,
            message: resp["infomsg"]
          });
        }).catch((error) => {
          console.log(error);
        });
      },
    },
    data() {
      var user_token = this.$cookie.get("user_token");
      return {
        user_token: user_token,
        backendhost: backendhost,
        backendport: backendport,
        actionurl: "http://" + backendhost + ":" + backendport + "/import/" + user_token,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    margin-top: 50px;
  }
  .line{
    width: 100%;
    text-align: left;
    margin-top: 20px;
    margin-left: 100px;
  }
  .uploadbutton{
    width: 200px;
    height: 34px;
    border-radius: 4px;
  }
  .uploadbutton:hover{
  }
  /*.uploaddiv{*/
    /*width: 200px;*/
    /*height: 34px;*/
    /*border-color: #d43f3a;*/
    /*background-color: #d9534f;*/
    /*color: #FEF3F3;*/
    /*border-radius: 4px;*/
    /*text-align: center;*/
    /*line-height: 34px;*/
    /*font-size: 12px;*/
  /*}*/
  /*uploaddiv:hover{*/
    /*border-color: #ac2925;*/
    /*background-color: #F56C6C;*/
  /*}*/
</style>
