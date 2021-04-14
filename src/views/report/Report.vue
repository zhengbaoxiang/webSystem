<template>
  <div>            <!-- 2 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <el-card>
      <el-col :span="6">
        <div id="pieId" style="height: 300px"></div>
      </el-col>
      <el-col :span="12">
        <div id="pieId2" style="height: 300px"></div>
      </el-col>
      <el-col :span="6">
        <div id="barId2" style="height: 300px"></div>
      </el-col>
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
      barChart2: null,
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
    this.pieChart2 = echarts.init(document.getElementById('pieId2'))
    this.barChart = echarts.init(document.getElementById('barId'))
    this.barChart2 = echarts.init(document.getElementById('barId2'))
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
      this.drawPie2()
      this.drawBar()
      this.drawBar2()
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
    drawPie2 (data) {
      // 5 配置项
      const option = {
        title: {
          text: '南丁格尔玫瑰图',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: [35, 140],
            center: ['25%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
              { value: 20, name: 'rose 5' },
              { value: 15, name: 'rose 6' },
              { value: 12, name: 'rose 7' },
              { value: 10, name: 'rose 8' }
            ]
          },
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 140],
            center: ['75%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: [
              { value: 30, name: 'rose 1' },
              { value: 28, name: 'rose 2' },
              { value: 26, name: 'rose 3' },
              { value: 24, name: 'rose 4' },
              { value: 22, name: 'rose 5' },
              { value: 20, name: 'rose 6' },
              { value: 18, name: 'rose 7' },
              { value: 16, name: 'rose 8' }
            ]
          }
        ]
      }
      // 6 展示数据
      this.pieChart2.setOption(option)
    },
    drawBar2 () {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      this.barChart2.setOption(option)
    },
    drawBar (data) {
      data = [18203, 23489, 29034, 104970, 131744, 630230]
      const option = {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络',
          textStyle: {
            fontSize: 14,
            align: 'left',
            color: 'rgba(255, 255, 255, 0.85)',
            fontWeight: 400
          },
          left: 133,
          top: 18
        },
        // 左右上下间距
        grid: {
          left: '3%',
          right: '8%',
          bottom: '1%',
          containLabel: true
        },
        yAxis: {
          type: 'category',
          inverse: true.valueOf,
          // 坐标数据
          data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
          axisLabel: {
            interval: 0,
            rotate: 0,
            margin: 110,
            formatter: (value) => {
              if (value.length > 6) {
                return value.substr(0, 6) + '...'
              }
              return value
            },
            fontSize: 14,
            align: 'left',
            color: 'rgba(255, 255, 255, 0.85)'
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'value',
          position: 'top',
          boundaryGap: [0, 0.01],
          max: 'dataMax',
          show: false,
          axisLine: {
            show: true
          },
          axisTick: {
            show: false
          }
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
        series: [
          {
            name: '2011年',
            type: 'bar',
            // data: [18203, 23489, 29034, 104970, 131744, 630230]
            data: data.map((item) => {
              const port = (630230 * 100 / item).toFixed(5) + '%'
              // console.log(port)
              const tempObj = {
                value: item,
                label: {
                  show: true,
                  position: [port, '50%']
                }
              }
              return tempObj
            }),
            // 默认的数据条颜色
            itemStyle: {
            // color: "#2BFBAC",
              color: new echarts.graphic.LinearGradient(
                0, 1, 1, 1,
                [
                  { offset: 0, color: '#13E3F5' },
                  { offset: 1, color: '#2BFBAC' }
                ]
              )
            },
            barWidth: 12,
            barCategoryGap: 20,
            // barMinWidth: 12,
            // barMaxWidth: 14,
            label: {
              show: true,
              color: 'rgba(0, 0, 0, 0.85)',
              fontSize: 14,
              // position: 'right',
              // position: [10, 10],
              position: ['100%', '50%'],
              align: 'left',
              verticalAlign: 'middle',
              offset: [ 20, 2 ],
              valueAnimation: true,
              formatter: (p) => {
                // console.log(p)
                let value = '' + p.value
                value = value.padStart(6, ' ')
                return value
              }
            },
            silent: true,
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(0, 0, 0, 0.2)'
            }
          },
          {
            name: '2012年',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807],
            barWidth: 12,
            barCategoryGap: 20,
            label: {
              show: true,
              fontSize: 14,
              position: ['100%', '50%'],
              align: 'left',
              verticalAlign: 'middle',
              offset: [ 20, 2 ],
              valueAnimation: true,
              formatter: (p) => {
                // console.log(p)
                let value = '' + p.value
                value = value.padStart(6, ' ')
                return value
              }
            }
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
