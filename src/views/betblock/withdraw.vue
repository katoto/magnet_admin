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
        <!--type="index"   index  -->
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="uid"
            width="100"
            label="用户uid">
          </el-table-column>
          <el-table-column
            prop="drawmoney"
            width="90"
            label="提款金额">
          </el-table-column>
          <el-table-column
            prop="drawfee"
            width="90"
            label="提款手续费">
          </el-table-column>
          <el-table-column
            prop="drawtime"
            label="提款时间">
          </el-table-column>
          <el-table-column
            width="200"
            label="提款目标账户">
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.to_addr_go">{{ scope.row.to_addr }}</a>
            </template>
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账户余额">
          </el-table-column>
          <el-table-column
            prop="drawstatusVal"
            label="提款状态">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="lineClick(scope.row)" :disabled="scope.row.drawstatus !== 0"  type="text" size="small">允许提款</el-button>
              <el-button @click="lineClick(scope.row)" :disabled="scope.row.drawstatus !== 0" type="danger" size="small">拒绝提款</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>

    <!-- 提款申请 -->

    <!-- 提款审核的操作弹窗 -->

  </div>
</template>

<script>
  import {mTypes, aTypes} from '@/store/modules/betblock'
  export default {
    data(){
      return {
        activeName: 'tkTable',
        tableStateName: '允许',
        tableData: []
      }
    },
    watch: {
      withdrawList(data){
        if (data && data.list) {
          data.list.forEach((val, index) => {
            if (val.drawtime) {
              val.drawtime = this.format( val.drawtime )
            }
            if (val.to_addr) {
              val.to_addr_go = 'https://etherscan.io/address/'+ val.to_addr
            }
            if (val.to_addr) {
              val.to_addr_go = 'https://etherscan.io/address/'+ val.to_addr
            }
            if( val.drawstatus !== undefined ){
              switch (val.drawstatus) {
                case 0:
                  val.drawstatusVal = '待审核'
                  ;
                  break;
                case 1:
                  val.drawstatusVal = '审核通过';
                  break;
                case 2:
                  val.drawstatusVal = '审核拒绝';
                  break;
                case 3:
                  val.drawstatusVal = '提款到账';
                  break;
                case -1:
                  val.drawstatusVal = '提款失败';
                  break;
              }

            }

          });
          this.tableData = data.list;
        }
      }
    },
    methods: {
      confirmFn( lineData ){
        this.$confirm('拒绝该用户<<' + lineData.uid + '>>提款申请, 是否继续?', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:'',
          inputErrorMessage:'请输入备注'
        }).then( async () => {
          let backData = await this.$store.dispatch(aTypes.setWithDraw, lineData , '1' );
          console.log(backData);
          console.log(backData);

          this.$message({
            type: 'success',
            message: '已成功拒绝!'
          });

        }).catch(() => {
          this.$store.dispatch(aTypes.setWithDraw, lineData , '0' )
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      format (time, format = 'yyyy-MM-dd') {
          time = +time * 1000;
        let t = new Date(time);
        let tf = function (i) {
          return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return tf(t.getFullYear());
            case 'MM':
              return tf(t.getMonth() + 1);
            case 'mm':
              return tf(t.getMinutes());
            case 'dd':
              return tf(t.getDate());
            case 'HH':
              return tf(t.getHours());
            case 'ss':
              return tf(t.getSeconds())
          }
        })
      },
      lineClick(row){
        this.confirmFn(row)

      },
      bannerClick() {
        if (this.activeName) {
          switch (this.activeName) {
            case 'jcMsg':
              this.activeName = 'jcMsg';
              break;
            case 'gjMsg':
              this.activeName = 'gjMsg';
              break;
            case 'tkTable':
              this.activeName = 'tkTable';
              break
          }
        }
      }
    },
    computed: {
      withdrawList(){
        return this.$store.state.betblock.withdrawList
      }
    },
    mounted(){
      console.log(this.matchList_hot);
      this.$store.dispatch(aTypes.getWithDrawMsg)
    },
    filters: {
      format (time, format = 'yyyy-MM-dd') {
        let t = new Date(time)
        let tf = function (i) {
          return (i < 10 ? '0' : '') + i
        }
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
          switch (a) {
            case 'yyyy':
              return tf(t.getFullYear())
            case 'MM':
              return tf(t.getMonth() + 1)
            case 'mm':
              return tf(t.getMinutes())
            case 'dd':
              return tf(t.getDate())
            case 'HH':
              return tf(t.getHours())
            case 'ss':
              return tf(t.getSeconds())
          }
        })
      },
    }
  }
</script>
