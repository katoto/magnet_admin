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
            label="提款时间"
            width="110">
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
            label="账户余额"
          >
          </el-table-column>
          <el-table-column
            prop="drawstatusVal"
            label="提款状态"
            width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="scope">
              <section v-if="scope.row.drawstatus === 0">
                <el-button @click="lineClick( scope.row,'1' )" :disabled="scope.row.drawstatus !== 0" type="text"
                           size="small">
                  允许提款
                </el-button>
                <el-button @click="lineClick(scope.row , '2')" :disabled="scope.row.drawstatus !== 0" type="danger"
                           size="small">拒绝提款
                </el-button>
              </section>
              <section v-else>
                <el-button type="success" size="small" disabled>已操作
                </el-button>
              </section>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page.sync="pageNumber"
            size="small"
            :page-size="pageSize"
            layout="prev, pager, next,jumper"
            :total="totalCount">
          </el-pagination>
        </div>

      </div>


    </section>

    <!-- 提款申请 -->
    <!-- 提款审核的操作弹窗 -->
    <el-dialog title="注意！" :visible.sync="dialogTableVisible">
      <section>
        {{ js_withdrawMsg }}
      </section>
      <div>
        <span>请输入审核备注:</span>
        <el-input placeholder="请输入审核备注" v-model='withdraw_remark'></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="surePay">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mTypes, aTypes} from '@/store/modules/betblock'
  export default {
    data(){
      return {

        totalCount: 10,
        pageNumber: 1,
        pageSize: 6,

        withdraw_remark: '',
        dialogTableVisible: false,
        activeName: 'tkTable',
        tableStateName: '允许',
        tableData: [],
        js_withdrawMsg: null,
        currLineData: null,
        currType: null
      }
    },
    watch: {
      withdrawList(data){
        if (data && data.list) {
          data.list.forEach((val, index) => {
            if (val.drawtime) {
              val.drawtime = this.format(val.drawtime)
            }
            if (val.to_addr) {
              val.to_addr_go = 'https://etherscan.io/address/' + val.to_addr
            }
            if (val.to_addr) {
              val.to_addr_go = 'https://etherscan.io/address/' + val.to_addr
            }
            if (val.drawstatus !== undefined) {
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
      async surePay(){
        let surePayBack = null;
        Object.assign(this.currLineData, {
          remark: this.withdraw_remark,
          isAgree: this.currType
        })

        if (this.currType === '2') {
          surePayBack = await this.$store.dispatch(aTypes.setWithDraw, this.currLineData);
        } else {
          surePayBack = await this.$store.dispatch(aTypes.setWithDraw, this.currLineData);
        }

        if (surePayBack && 1) {
          this.dialogTableVisible = false;
          this.$store.dispatch(aTypes.getWithDrawMsg)

        }

      },
      confirmFn(lineData, type){

        if (type === '2') {
          this.js_withdrawMsg = '拒绝用户《' + lineData.uid + '》提款？'

        } else {
          this.js_withdrawMsg = '允许用户《' + lineData.uid + '》提款？'
        }
        this.dialogTableVisible = true;
        this.currLineData = lineData;
        this.currType = type;

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
      lineClick(row, type){
        this.withdraw_remark = '';
        this.confirmFn(row, type)

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
      },
      async handleCurrentChange (val) {

        let withDrawMsg = await this.$store.dispatch(aTypes.getWithDrawMsg, {
          'pageNumber': Number(val),
          'pageSize': this.pageSize
        })
        if (withDrawMsg) {
          if (withDrawMsg.list) {
            this.tableData = withDrawMsg.list
            // 处理页码
            this.totalCount = withDrawMsg.counter;
            this.pageNumber = withDrawMsg.pageno;
            this.pageSize = withDrawMsg.rangeno;
          }
        }
      },
    },
    computed: {
      withdrawList(){
        return this.$store.state.betblock.withdrawList
      }
    },
    async mounted(){
      let withDrawMsg = await  this.$store.dispatch(aTypes.getWithDrawMsg, {'pageNumber': 1, 'pageSize': this.pageSize})

      if (withDrawMsg) {
        this.totalCount = withDrawMsg.counter;
        this.pageNumber = withDrawMsg.pageno;
        this.pageSize = withDrawMsg.rangeno;
      }

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
<style>
  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }
</style>
