<template>
  <div class="dashboard-container">
    <h2>welcome admin </h2>
    <div class="dashboard-text">Hello user : {{email}}</div>
    <el-carousel :interval="5000" height="400px">
      <el-carousel-item v-for="item in imgArr" :key="item">
        <div>
          <img class="bannerClass" :src="item" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import img_banner1 from '@/assets/dashboard_img/banner1.png'
  import img_banner2 from '@/assets/dashboard_img/banner2.png'
  import img_banner3 from '@/assets/dashboard_img/banner3.png'

  export default {
      data(){
          return{
              imgArr:[ img_banner1 , img_banner2 , img_banner3]
          }
      },
      name: 'dashboard',
      computed: {
        ...mapGetters([
          'name',
        ]),
        email(){
          return this.$store.state.user.email
        },
      }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 20px;
      line-height: 36px;
    }
  }

  .bannerClass{
    display: block;
    width: 100%;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
