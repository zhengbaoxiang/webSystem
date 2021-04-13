<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据统计</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

            <!-- 2 为 ECharts 准备一个具备大小（宽高）的 DOM -->
        <el-card>
            <div id="pieId" style="width: 750px; height: 300px"></div>
        </el-card>
        <el-card>
            <div id="barId" style="width: 750px; height: 400px"></div>
        </el-card>
        <el-card>
            <div id="LineId" style="width: 750px; height: 350px"></div>
        </el-card>
    </div>
</template>
<script>
// 1 导入echarts
import echarts from 'echarts'
// const echarts = require('echarts')
export default {
  data () {
    return {
      // 需要合并的数据
      options: { },
      pieChart: null,
      barChart: null,
      lineChart: null
    }
  },
  // 执行到这个周期函数，此时页面上的元素已经被渲染完毕
  created () {
    this.initial()
  },
  mounted () {
    // 3 基于准备好的dom，初始化echarts实例
    this.pieChart = echarts.init(document.getElementById('pieId'))
    this.barChart = echarts.init(document.getElementById('barId'))
    this.lineChart = echarts.init(document.getElementById('LineId'))
    // 4 准备数据
    this.getData()
  },
  methods: {
    initial () {
      console.log('初始化')
    },
    getData () {
      console.log('获取图表数据')
      this.drawPie()
      this.drawBar()
      this.dawLine()
    },
    drawPie (data) {
      // 5 配置项
      const option = {
        title: {
          show: true,
          top: '42%',
          left: 'center',
          text: 'titleName',
          subtext: 'subtitleName',
          padding: 0,
          itemGap: 0,
          // textAlign: 'center',
          textStyle: {
            color: '#4A4A4A',
            height: 0,
            lineHeight: 20,
            fontSize: 16,
            fontFamily: 'DINPro-Medium'
          },
          subtextStyle: {
            color: '#8D929E',
            height: 17,
            lineHeight: 17,
            fontSize: 12,
            fontFamily: 'PingFangSC-Regular'
          }

        },
        tooltip: {
          show: true,
          trigger: 'item',
          transitionDuration: 0, // 无需提示框的动画
          padding: 20, // 设置提示框内边距
          alwaysShowContent: false // 设置提示框永久展示
          // 自定义提示框的格式
          // formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        textStyle: {
          color: 'grey',
          fontSize: 10,
          height: 16,
          lineHeight: 16
        },
        legend: {
          show: false,
          id: 1786,
          // type: 'scroll', // 滚动图例，只能设置单方的尺寸
          orient: 'horizontal',
          // orient: 'vertical',
          // type: 'plain', // 默认平铺，图例可设置宽高，
          // height: 800,
          width: 300,
          top: 0,
          selectedMode: true, // 'single' multiple ,true,单选多选，切换显隐
          icon: 'circle',
          itemHeight: 12,
          itemWidth: 12
        },
        series: [
          {
            type: 'pie',
            id: 'seriesId',
            name: 'serierName',
            // roseType: 'radius',
            selectedOffset: 10,
            selectedMode: 'single',
            hoverAnimation: false,
            hoverOffset: 10,
            animationDuration: 10,
            avoidLabelOverlap: false,
            stillShowZeroSum: false, // 和为零 不显示

            label: {
              show: false,
              position: 'center',
              color: 'red'
            },
            labelLine: {
              show: false
            },
            // 高亮扇区
            emphasis: {
              label: {
                show: false,
                color: 'red'
              }
            },
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [
              { value: 1048, name: '搜索引擎' },
              { value: 735, name: '直接访问' },
              { value: 580, name: '邮件营销' },
              { value: 484, name: '联盟广告' },
              { value: 300, name: '视频广告' }
            ]
          }
        ]

      }
      // 6 展示数据
      this.pieChart.setOption(option)
    },
    drawBar (data) {
      const option = {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '1%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
        ]

      }
      this.barChart.setOption(option)
    },
    dawLine (data) {
      const option = {
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]

      }
      this.lineChart.setOption(option)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
