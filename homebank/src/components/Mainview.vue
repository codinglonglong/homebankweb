<template>
  <div class="mainview">
    <Navigator defaultActive="mainview"></Navigator>
    <Accountcard v-for="item in datalist" :key="item.date_str"
                 :date_str="item.date_str"
                 :date_desp="item.date_desp"
                 :date_status="item.date_status"
                 :total_value="item.total_value"
                 :table_data="item.table_data"
    ></Accountcard>
    <el-button type="info" class="buttonpager" :disabled="head" @click="gotohead()">首页</el-button>
    <el-button type="default" class="buttonpager" :disabled="head" @click="gotolast()">上一页</el-button>
    <el-button type="default" class="buttonpager" :disabled="tail" @click="gotonext()">下一页</el-button>
    <el-button type="info" class="buttonpager" :disabled="tail" @click="gototail()">尾页</el-button>
    <div class="space"></div>
  </div>
</template>

<script>
  import Navigator from '../components/Navigator'
  import Accountcard from '../components/Accountcard'
  export default {
    name: 'mainview',
    components: {
      Navigator,
      Accountcard
    },
    created() {
      this.getdata();
    },
    methods: {
      gotohead(){
        this.getmaxpage(this.headpage);
      },
      gotolast(){
        this.getmaxpage(this.lastpage);
      },
      gotonext(){
        this.getmaxpage(this.nextpage);
      },
      gototail(){
        this.getmaxpage(this.tailpage);
      },
      headpage(maxpage){
          this.pagenum=1;
          this.loadpager(maxpage);
      },
      lastpage(maxpage){
          this.pagenum = this.pagenum - 1;
          this.loadpager(maxpage);
      },
      nextpage(maxpage){
        this.pagenum = this.pagenum + 1;
        this.loadpager(maxpage);
      },
      tailpage(maxpage){
        this.pagenum = maxpage;
        this.loadpager(maxpage);
      },
      loadpager(maxpage){
        if (this.pagenum === 1) {
          this.head = true;
        } else {
          this.head = false;
        }
        if (this.pagenum === maxpage) {
          this.tail = true;
        } else {
          this.tail = false;
        }
        this.datalist = [];
        this.getdata();
      },
      getmaxpage(callback){
        var user_token = this.$cookie.get("user_token");
        this.axios.get("/account/" + this.pagenum + "/" + user_token).then((response) => {
          var resp = response.data;
          var maxpage = parseInt(resp["infomsg"]);
          callback(maxpage);
        }).catch((error) => {
        });
      },
      checkdate(account_date, account_type){
        for (var i = 0; i < this.datalist.length; i++) {
          if (this.datalist[i]["date_str"] === account_date) {
            if (this.datalist[i]["date_status"] === "info") {
              if (account_type === 1) {
                return i;
              }
            }
            else if (this.datalist[i]["date_status"] === "success") {
              if (account_type === 2) {
                return i;
              }
            }
            else if (this.datalist[i]["date_status"] === "warning") {
              if (account_type === 3) {
                return i;
              }
            }
            else if (this.datalist[i]["date_status"] === "error") {
              if (account_type === 4) {
                return i;
              }
            }
          }
        }
        return -1;
      },
      getdata(){
        var user_token = this.$cookie.get("user_token");
        this.axios.get("/account/" + this.pagenum + "/" + user_token).then((response) => {
          var resp = response.data;
          var maxpage = parseInt(resp["infomsg"]);
          if (maxpage === this.pagenum) {
            this.tail = true;
          }
          var accountlist = resp["inforesult"];
          for (var i = 0; i < accountlist.length; i++) {
            var account_date = accountlist[i]["account_date"];
            var account_type = accountlist[i]["account_type"];
            var posi = this.checkdate(account_date, account_type);
            if (posi === -1) {
              // 确定主键date_str和date_status
              if (account_type === 1) {
                var total1 = accountlist[i]["account_money"];
                this.datalist.push({
                  "date_str": account_date,
                  "date_desp": "支出",
                  "date_status": "info",
                  "total_value": total1,
                  "table_data": [{
                    "account_id": accountlist[i]["account_id"],
                    "account_item": accountlist[i]["account_item"],
                    "account_money": accountlist[i]["account_money"],
                    "account_addition": accountlist[i]["account_addition"]
                  }],
                });
              }
              else if (account_type === 2) {
                console.log("enter");
                var total2 = accountlist[i]["account_money"];
                this.datalist.push({
                  "date_str": account_date,
                  "date_desp": "收入",
                  "date_status": "success",
                  "total_value": total2,
                  "table_data": [{
                    "account_id": accountlist[i]["account_id"],
                    "account_item": accountlist[i]["account_item"],
                    "account_money": accountlist[i]["account_money"],
                    "account_addition": accountlist[i]["account_addition"]
                  }]
                });
              }
              else if (account_type === 3) {
                var total3 = accountlist[i]["account_money"];
                this.datalist.push({
                  "date_str": account_date,
                  "date_desp": "贷出",
                  "date_status": "warning",
                  "total_value": total3,
                  "table_data": [{
                    "account_id": accountlist[i]["account_id"],
                    "account_item": accountlist[i]["account_item"],
                    "account_money": accountlist[i]["account_money"],
                    "account_addition": accountlist[i]["account_addition"]
                  }]
                });
              }
              else if (account_type === 4) {
                var total4 = accountlist[i]["account_money"];
                this.datalist.push({
                  "date_str": account_date,
                  "date_desp": "借入",
                  "date_status": "error",
                  "total_value": total4,
                  "table_data": [{
                    "account_id": accountlist[i]["account_id"],
                    "account_item": accountlist[i]["account_item"],
                    "account_money": accountlist[i]["account_money"],
                    "account_addition": accountlist[i]["account_addition"]
                  }]
                });
              }
            }
            else {
              // 添加账目
              var totalmoney = parseFloat(this.datalist[posi]["total_value"]) + parseFloat(accountlist[i]["account_money"]);
              this.datalist[posi]["total_value"] = totalmoney;
              this.datalist[posi]["table_data"].push({
                "account_id": accountlist[i]["account_id"],
                "account_item": accountlist[i]["account_item"],
                "account_money": accountlist[i]["account_money"],
                "account_addition": accountlist[i]["account_addition"]
              });
            }
          }
        }).catch((error) => {
        });
      }
    },
    data() {
      return {
        pagenum: 1,
        head: true,
        tail: false,
        datalist: [],
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buttonpager {
    margin-top: 30px;
  }

  .space {
    width: 100%;
    height: 50px;
  }
</style>
