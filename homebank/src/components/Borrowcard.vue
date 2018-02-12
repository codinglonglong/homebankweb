<template>
  <div class="borrowcard">
    <el-card class="box-card">
      <div class="clearfix" style="text-align: left;">
        <el-alert
          :title="person_name"
          :type="person_status"
          :closable="false"
          class="borrowalert"
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
          :default-sort="{prop: 'borrow_date', order: 'descending'}"
        >
          <el-table-column
            prop="borrow_date"
            label="日期"
          >
          </el-table-column>
          <el-table-column
            prop="borrow_type"
            label="类型"
          >
          </el-table-column>
          <el-table-column
            prop="borrow_money"
            label="金额"
          >
          </el-table-column>
          <el-table-column
            prop="borrow_addition"
            label="备注"
          >
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'borrowcard',
    props: ['person_name', 'person_status', 'table_data', 'total_value'],
  }
</script>

<style scoped>
  .borrowcard {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }

  .borrowalert {
    text-align: left;
  }
</style>
