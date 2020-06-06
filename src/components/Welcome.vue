<template>
  <div>
    <span class="title">电商后台管理系统欢迎您</span>
    <el-carousel>
      <el-carousel-item v-for="item in welcomePage" :key="item.id">
        <img :src="item.idView"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      welcomePage: [
        { id: 0, idView: require('../assets/img/1.jpg') },
        { id: 1, idView: require('../assets/img/2.jpg') },
        { id: 2, idView: require('../assets/img/3.jpg') },
        { id: 3, idView: require('../assets/img/4.jpg') }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 24px;
}
.el-carousel {
  top: 20px;
  width: 533px;
}
</style>