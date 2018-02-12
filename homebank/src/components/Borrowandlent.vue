<template>
  <div class="borrowandlent">
    <Navigator defaultActive="borrowandlent"></Navigator>
    <Borrowcard v-for="item in datalist" :key="item.person_name"
                :person_name="item.person_name"
                :person_status="item.person_status"
                :total_value="item.total_value"
                :table_data="item.table_data"></Borrowcard>
    <div style="height: 50px;"></div>
  </div>
</template>

<script>
  import Navigator from '../components/Navigator'
  import Borrowcard from '../components/Borrowcard'
  export default {
    name: 'borrowandlent',
    components: {
      Navigator,
      Borrowcard
    },
    data() {
      return {
        datalist: []
      }
    },
    created() {
      this.getdata();
    },
    methods: {
      getpersonlist(origindata){
        var personlist = [];
        for (var i = 0; i < origindata.length; i++) {
          if (personlist.indexOf(origindata[i]["account_item"]) >= 0) {
          } else {
            personlist.push(origindata[i]["account_item"]);
          }
        }
        return personlist;
      },
      getdata(){
        var user_token = this.$cookie.get("user_token");
        this.axios.get("/account/borrow/" + user_token).then((response) => {
          var resp = response.data;
          var origindata = resp["inforesult"];
          var personlist = this.getpersonlist(origindata);
          for (var i = 0; i < personlist.length; i++) {
            var person_name = personlist[i];
            var total_borrow = 0;
            var total_lent = 0;
            var table_data = [];
            for (var j = 0; j < origindata.length; j++) {
              if (person_name === origindata[j]["account_item"]) {
                table_data.push({
                  "borrow_date": origindata[j]["account_date"],
                  "borrow_type": parseInt(origindata[j]["account_type"]) === 3 ? "贷出" : "借入",
                  "borrow_money": origindata[j]["account_money"],
                  "borrow_addition": origindata[j]["account_addition"]
                });
                if (origindata[j]["account_type"] === 3) {
                  total_lent = total_lent + parseFloat(origindata[j]["account_money"]);
                } else if (origindata[j]["account_type"] === 4) {
                  total_borrow = total_borrow + parseFloat(origindata[j]["account_money"]);
                }
              }
            }
            var total_money = (total_borrow - total_lent).toFixed(2);
            if (total_money != 0){
              if (total_money < 0) {
                var person_status = "warning";
              }
              this.datalist.push({
                "person_name": person_name,
                "person_status": person_status,
                "total_value": total_money,
                "table_data": table_data
              })
            }
          }
          this.datalist.sort(function(a, b){
              return b["total_value"] - a["total_value"]
          });
        }).catch((error) => {
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
