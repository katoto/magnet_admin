<template>
  <div class="app-container">
    <section>
      <p>奖池总额：123 ETH</p>
      <p>奖池中奖数：321 </p>
      <p>历史派发总额：123 </p>
    </section>
    <el-tabs v-model="activeName" @tab-click="bannerClick">
      <el-tab-pane label="奖池信息" name="jcMsg"></el-tab-pane>
      <el-tab-pane label="告警信息" name="gjMsg"></el-tab-pane>
      <el-tab-pane label="提款审核" name="tkTable"></el-tab-pane>
    </el-tabs>
    <section>
      <div v-if="activeName === 'jcMsg'">
        奖池信息
      </div>
      <div v-if="activeName === 'gjMsg'">
        告警信息
      </div>
      <div v-if="activeName === 'tkTable'">
        <p>提款审核表</p>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="date"
            label="中奖地址">
          </el-table-column>
          <el-table-column
            prop="name"
            label="投注金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="中奖金额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="历史投注总额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="历史中奖总额">
          </el-table-column>
          <el-table-column
            prop="address"
            label="累计盈亏">
          </el-table-column>
          <el-table-column
            prop="address"
            label="当前状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="lineClick(scope.row)" type="text" size="small">允许</el-button>
              <el-button @click="lineClick(scope.row)" type="danger" size="small">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 提款申请 -->
  </div>
</template>

<script>
  import {mTypes, aTypes} from '@/store/modules/betblock'
  export default {
      data(){
          return {
              activeName: 'tkTable',
              tableStateName: '允许',
              tableData: [{
                  date: '2016-05-03',
                  name: '王虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
              }, {
                  date: '2016-05-02',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
              }]
          }
      },
      watch: {},
      methods: {
          confirmFn(userName){
              this.$confirm('拒绝该用户<<' + userName + '>>提款申请, 是否继续?', '注意', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$message({
                      type: 'success',
                      message: '已成功拒绝!'
                  });
              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消'
                  });
              });
          },
          lineClick(row){
              console.log(row);
              console.log(row.name);
              this.confirmFn(row.name)

          },
          bannerClick() {
              if (this.activeName) {
                  switch (this.activeName) {
                  case 'jcMsg':
                      this.activeName = 'jcMsg'
                      break;
                  case 'gjMsg':
                      this.activeName = 'gjMsg'
                      break;
                  case 'tkTable':
                      this.activeName = 'tkTable'
                      break
                  }
              }
          }
      },
      computed: {
          matchList_hot(){
              return this.$store.state.betblock.matchList_hot
          }
      },
      mounted(){
          console.log(this.matchList_hot);
          console.log(this.matchList_hot);
          this.$store.dispatch(aTypes.getWithDrawMsg)
      }
  }
</script>
