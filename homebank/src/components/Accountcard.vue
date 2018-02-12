<template>
  <div class="accountcard">
    <el-card class="box-card" style="border-width: 2px; border-style: solid; border-color: #bfcbd9;">
      <div class="clearfix" style="text-align: left;">
        <el-alert
          :title="date_str + ' ' + date_desp"
          :type="date_status"
          :closable="false"
          class="accountalert"
          style="font-weight: bold;">
        </el-alert>
        <span style="line-height: 50px;margin-right: 50px;font-weight: bold;">总计</span>
        <span style="line-height: 50px;font-weight: bold;">{{total_value}}元</span>
      </div>
      <div class="text item">
        <el-table
          :data="table_data"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="account_id"
            label="编号"
            v-if="false"
          >
          </el-table-column>
          <el-table-column
            prop="account_item"
            label="事项"
          >
          </el-table-column>
          <el-table-column
            prop="account_money"
            label="金额"
          >
          </el-table-column>
          <el-table-column
            prop="account_addition"
            label="备注"
          >
          </el-table-column>
          <el-table-column
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, table_data)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'accountcard',
    props: ['date_str', 'date_status', 'table_data', 'total_value', 'date_desp'],
    methods: {
      deleteRow(index, rows) {
        var user_token = this.$cookie.get("user_token");
        // 删除账目
        this.$confirm("确定要删除这条账目吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.axios.get("/account/"+user_token+"/"+rows[index]["account_id"]
            ).then((response) => {
                var resp = response.data;
                this.$message({
                  showClose: true,
                  message: resp["infomsg"]
                });
                rows.splice(index, 1);
              }).catch((error) => {
                console.log(error);
            });
        }).catch(() => {
        });
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .accountcard {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }

  .accountalert {
    text-align: left;
  }
</style>
