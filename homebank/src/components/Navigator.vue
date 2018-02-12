<template>
  <div class="navigator">
    <el-menu :default-active="defaultActive" theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="mainview">小家手帐</el-menu-item>
      <el-menu-item index="addaccount">添加账目</el-menu-item>
      <el-menu-item index="borrowandlent">借贷汇总</el-menu-item>
      <el-menu-item index="monthly">月度汇总</el-menu-item>
      <el-menu-item index="importexport">导入导出</el-menu-item>
      <el-menu-item index="logout" style="float: right;">退出系统</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navigator',
    props: ['defaultActive'],
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if (key === "logout") {
          this.handleLogout();
        } else if (key === "addaccount") {
          this.$router.push({name: "addaccount"});
        } else if (key === "mainview") {
          this.$router.push({name: "mainview"});
        } else if (key === "monthly") {
          this.$router.push({name: "monthly"});
        } else if (key === "borrowandlent") {
          this.$router.push({name: "borrowandlent"});
        } else if (key === "importexport") {
          this.$router.push({name: "importexport"});
        }
      },
      handleLogout() {
        this.axios.get("/login/" + this.$cookie.get("user_token")).then((response) => {
          var resp = response.data;
          if (!resp["infostatus"]) {
            this.$message({
              showClose: true,
              message: resp["infomsg"]
            });
          } else {
            this.$cookie.delete("user_token");
            this.$cookie.delete("user_password");
            this.$cookie.delete("user_email");
            this.$router.push({name: 'login'});
          }
        }).catch((error) => {
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
