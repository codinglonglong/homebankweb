<template>
  <div class="monthly">
    <Navigator defaultActive="monthly"></Navigator>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;margin-right: 50px;font-weight: bold;">当前可用资金余额</span>
        <span style="line-height: 36px;font-weight: bold;">{{totalValue}} 元</span>
      </div>
      <div class="text item">
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 80%; margin-left:auto; margin-right: auto;"
          :default-sort="{prop: 'summary_month', order: 'descending'}"
        >
          <el-table-column
            prop="summary_month"
            label="月份"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="summary_total"
            label="汇总"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="summary_out"
            label="支出"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="summary_in"
            label="收入"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="summary_lent"
            label="贷出"
            sortable
          >
          </el-table-column>
          <el-table-column
            prop="summary_borrow"
            label="借入"
            sortable
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>



  </div>
</template>

<script>
  import Navigator from '../components/Navigator'
  export default {
    name: 'monthly',
    components: {
      Navigator
    },
    data() {
      return {
        totalValue: 0,
        tableData: [
        ],
      }
    },
    created() {
      this.getdata();
    },
    methods: {
      getdata(){
        var user_token = this.$cookie.get("user_token");
        this.axios.get("/account/summary/" + user_token).then((response) => {
          var resp = response.data;
          var totalvalue = resp["inforesult"][0];
          this.totalValue = totalvalue;
          var accountlist = resp["inforesult"][1];
          for (var i = 0; i < accountlist.length; i++) {
            this.tableData.push({
              "summary_month": accountlist[i]["summary_month"],
              "summary_total": accountlist[i]["summary_total"],
              "summary_out": accountlist[i]["summary_out"],
              "summary_in": accountlist[i]["summary_in"],
              "summary_lent": accountlist[i]["summary_lent"],
              "summary_borrow": accountlist[i]["summary_borrow"]
            });
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
