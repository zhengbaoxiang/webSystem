<template>
  <div>
    <el-col :span="8">
        <div id="barId2" style="height: 300px"></div>
      </el-col>
      <el-col :span="12">
        <div id="barId" style="width: 750px; height: 400px"></div>
      </el-col>
  </div>
</template>
<script>
// 1 导入echarts
import echarts from 'echarts'
export default {
  name: 'chartBar',
  data () {
    return {
      barChart: null,
      barChart2: null
    }
  },
  created () {
    this.initial()
  },
  mounted () {
    // 3 基于准备好的dom，初始化echarts实例
    this.barChart = echarts.init(document.getElementById('barId'))
    this.barChart2 = echarts.init(document.getElementById('barId2'))
    // 4 准备数据
    this.getData()
  },
  methods: {
    initial () {
      console.log('初始化')
    },
    getData () {
      console.log('获取图表数据')
      this.drawBar()
      this.drawBar2()
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
