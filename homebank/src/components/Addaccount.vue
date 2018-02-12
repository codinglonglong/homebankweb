<template>
  <div class="addaccount">
    <Navigator defaultActive="addaccount"></Navigator>
    <Addpanel v-for="comp in allComponents" :key="comp.componentid"
              :showMinus="comp.showMinus"
              :dataModel="comp.datamodel"
              :componentid="comp.componentid"></Addpanel>
    <el-button type="primary" @click="this.addPanel">继续添加</el-button>
    <el-button type="success" @click="this.addAccount">提交账目</el-button>
  </div>
</template>

<script>
  import Navigator from '../components/Navigator'
  import Addpanel from '../components/Addpanel'
  import zfill from 'zfill'
  export default {
    name: 'addaccount',
    components: {
      Navigator,
      Addpanel
    },
    methods: {
      addAccount() {
        this.$confirm("请认真核对输入的账目，确定要提交吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          for (var i = 0; i < this.allComponents.length; i++) {
            var datamodel = this.allComponents[i]["datamodel"];
            var adt = datamodel["account_date"];
            var year = adt.getFullYear();
            var month = adt.getMonth() + 1;
            var day = adt.getDate();
            var account_date = zfill(year, 4) + "-" + zfill(month, 2) + "-" + zfill(day, 2);
            var account_addition = datamodel["account_addition"];
            var account_type = datamodel["account_type"];
            var account_item = datamodel["account_item"];
            var account_money = datamodel["account_money"];
            var user_token = this.$cookie.get("user_token");
            this.axios.post("/account/" + user_token,
              {
                "account_date": account_date,
                "account_addition": account_addition,
                "account_type": account_type,
                "account_item": account_item,
                "account_user": 0,
                "account_money": account_money
              }).then((response) => {
              var resp = response.data;
              this.$message({
                showClose: true,
                message: resp["infomsg"],
                onClose: resp["infostatus"] ? this.onReturn : null
              });
            }).catch((error) => {
                console.log(error);
            });
          }
        }).catch(() => {
        });
      },
      onReturn() {
        this.$router.push({name: "mainview"});
      },
      addPanel() {
        this.maxcomponentid++;
        this.allComponents.push({
          "componentid": this.maxcomponentid,
          "showMinus": true,
          "datamodel": {
            account_item: "",
            account_money: "",
            account_date: new Date(),
            account_type: "1",
            account_addition: "",
          }
        });
      },
      removeComponent(componentid){
        var posi = 0;
        for (var i = 0; i < this.allComponents.length; i++) {
          if (this.allComponents[i]["componentid"] === componentid) {
            posi = i;
            break;
          }
        }
        this.allComponents.splice(i, 1);
      }
    },
    data() {
      return {
        maxcomponentid: 1,
        allComponents: [
          {
            "componentid": 1,
            "showMinus": false,
            "datamodel": {
              account_item: "",
              account_money: "",
              account_date: new Date(),
              account_type: "1",
              account_addition: "",
            }
          },
        ],
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
