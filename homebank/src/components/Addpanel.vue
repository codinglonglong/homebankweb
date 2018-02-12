<template>
  <div class="addpanel">
    <el-row :gutter="10">
      <el-form ref="dataModel" :rules="formaddaccountrules" :model="formaddaccount">
      <el-col :span="3" :offset="1">
        <div class="grid-content bg-purple">
            <el-input v-model="dataModel.account_item" placeholder="事项"></el-input>
        </div>
      </el-col>
      <el-col :span="2" style="margin-left: 10px;">
        <div class="grid-content bg-purple">
          <el-input v-model="dataModel.account_money" placeholder="金额"></el-input>
        </div>
      </el-col>
      <el-col :span="2" style="margin-left: 10px;">
        <div class="grid-content bg-purple">
          <el-select v-model="dataModel.account_type" placeholder="请选择账目类型">
            <el-option label="支出" value="1"></el-option>
            <el-option label="收入" value="2"></el-option>
            <el-option label="贷出" value="3"></el-option>
            <el-option label="借入" value="4"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-date-picker
              v-model="dataModel.account_date"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input v-model="dataModel.account_addition" placeholder="备注"></el-input>
        </div>
      </el-col>
      <el-col  :span="4" style="text-align: left;margin-left: 15px;">
        <div class="grid-content bg-purple">
          <el-button type="danger" v-if="showMinus" @click="removeComponent(componentid)">删除此项</el-button>
        </div>
      </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'addpanel',
    props: ['showMinus', 'dataModel', 'componentid'],
    data(){
      return {
        formaddaccount: {
        },
        formaddaccountrules: {
        }
      }
    },
    methods: {
      removeComponent(componentid){
          this.$parent.removeComponent(componentid);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
  }

  .bg-purple {
  }

  .bg-purple-light {
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
  }
</style>
