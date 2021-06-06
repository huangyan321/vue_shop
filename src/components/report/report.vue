<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
     <div id="main" style="width: 600px;height:400px;">
     </div>
    </el-card>
  </div>
</template>

<script>
export default {
  // components: {
  //   echarts
  // },
  data(){
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
   async mounted(){
     var myChart = this.$echarts.init(document.getElementById('main'));
        // 指定图表的配置项和数据
       const {data: res} =await this.$http.get('reports/type/1')
        console.log(res);
       var charts =  this.$_.merge(res.data,this.options)
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(charts);
    }
}
</script>

<style scoped>

</style>