<template>
<div>
  <!-- 卡片视图 -->
  <el-card>
    <el-row>
        <el-col :span="6">
            <el-input  v-model="keyWord"
              @input="keyWord = inputChange(keyWord)"
              @change="inputFished"
              placeholder="请输入内容"
              maxlength="15"
              clearable

            >
              <el-button slot="append" icon="el-icon-search"  @click="searchData(keyWord)"></el-button>
            </el-input>
        </el-col>
        <el-button  @click="reset" class="ml20">重置</el-button>

        <el-select v-model="status" class="ml20" placeholder="请选择是否付款" clearable @change="optionChange" >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>

        <el-date-picker
          class="ml20"
          v-model="dateSelected"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="dateChange"
          value-format="yyyy-MM-dd"
          >
          <!--选中值返回的格式 value-format="yyyy-MM-dd" 或  value-format="timestamp" -->
          <!--选中值显示的格式 format="yyyy-MM-dd" 或  format="timestamp" -->
        </el-date-picker>

        <el-button  @click="createItem" class="fr mr20">新增</el-button>

    </el-row>
    <!-- 订单列表数据 , 边框 ，斑马纹 -->
    <el-table :data="filterList" border stripe  @selection-change="handleSelectionChange" empty-text="暂时没有数据。">
      <!-- selection 添加勾选框，fixed固定在左侧 -->
        <el-table-column type="selection" label="#" align="center" fixed="left"></el-table-column>
        <el-table-column type="index" label="#" align="center" fixed="left"></el-table-column>
        <!-- show-overflow-tooltip 宽度过小时显示tooltips -->
        <el-table-column   label="订单标号" prop="reciptNo" width="120"  show-overflow-tooltip   align="center" ></el-table-column>

        <el-table-column   label="联系方式"  prop="phone" width="130"  align="center" >
        </el-table-column>
        <el-table-column   label="下单人"  prop="userName" width="100" align="center" >
        </el-table-column>
        <el-table-column label="是否付钱" prop="status" width="100" align="center">
            <!-- 自定义显示的模板 -->
            <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.status === 1">已付款</el-tag>
                <el-tag type="danger" v-if="scope.row.status === 0">未付款</el-tag>
            </template>
        </el-table-column>
        <!-- sortable支持排序,,可以使用sort-method或者sort-by使用自定义的排序规则，
            formatter格式化显示内容 -->
        <el-table-column label="下单时间" prop="createTime" width="200" align="center" sortable :formatter="formatter">
        </el-table-column>
        <el-table-column   label="其他字段" prop="reciptNo" width="200"     align="center" ></el-table-column>
        <el-table-column   label="其他字段" prop="reciptNo" min-width="100" align="center" ></el-table-column>
        <el-table-column   label="其他字段" prop="reciptNo" min-width="170" align="center" ></el-table-column>
        <el-table-column label="操作" width="200"  align="center" fixed="right">
            <template slot-scope="scope">
                <el-button
                    icon="el-icon-edit"
                    type="primary"
                    size="mini"
                    @click="editData(scope)"
                ></el-button>
                <el-button
                    icon="el-icon-delete"
                    type="danger"
                    size="mini"
                    @click="deleteData(scope)"
                ></el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
    ></el-pagination>
  </el-card>
  <!-- 修改地址的对话框 -->
  <el-dialog
      title="修改地址"
      :visible.sync="addressVisible"
      width="50%"
      @close="addressClosed"
  >
      <el-form
          :model="addressForm"
          :rules="addressFormRules"
          ref="addressFormRef"
          label-width="100px"
      >
          <el-form-item label="省市区/县" prop="address1">
              <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
              <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addressVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  <!-- 展示物流进度的对话框 -->
  <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <el-timeline :reverse="reverse">
          <el-timeline-item
              v-for="(activity, index) in timeList"
              :key="index"
              :timestamp="activity.ftime"
          >
              {{ activity.context }}
          </el-timeline-item>
      </el-timeline>
  </el-dialog>
</div>
</template>
<script>
import cityData from './citydata.js'
export default {
  name: 'list',
  data () {
    return {
      descripts: '列表过滤，以及单个数据的增删改查',
      keyWord: '', // 模糊查询
      status: null, //  true,false,null表示全部
      startTime: '',
      endTime: '',

      queryInfo: {
        pagenum: 1, // 页码
        pagesize: 10 // 每页显示条数

      },
      statusOptions: [
        {
          value: '0',
          label: '未付款'
        }, {
          value: '1',
          label: '已付款'
        }
      ],
      dateSelected: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },

      dataList: [],
      filterList: [],
      total: 0,

      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [{ required: true, message: '请选择选择省市区县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
      },
      cityData,
      progressVisible: false,
      reverse: false,
      timeList: []
    }
  },
  created () {
    this.getdataList()
  },
  mounted () {

  },
  methods: {
    inputChange (value = '') {
      let newValue = value.trim() // 去两端空格
      var pattern = /[^A-Za-z0-9\u4e00-\u9fa5]/g // 只允许输入中英文数字
      newValue = value.replace(pattern, '')
      // console.log('持续正则校验，过滤前', '|' + value + '|')
      // console.log('过滤后', '|' + newValue + '|')
      // 实时搜索可以在这里调用getData
      return newValue
    },
    inputFished (value) {
      // console.log('失去焦点触发：', value)
      // 此时可以调用search,或getData
      this.searchData(value)
    },
    searchData (keyWord) {
      console.log('keyword：', '|' + keyWord + '|')
      // 有接口就用getData()
      this.getdataList()
      // 没有接口，可以本地进行筛选,
      const filterData = this.dataList.filter(item => {
        if (item.reciptNo.includes(keyWord)) {
          return true
        } else if (item.userName.includes(keyWord)) {
          return true
        } else if (item.phone.includes(keyWord)) {
          return true
        } else {
          return false
        }
      })
      // console.log('过滤后的列表', filterData)
      // 过滤完统一赋值
      this.filterList = filterData
    },

    getdataList () {
      const params = {
        keyWord: this.keyWord,
        status: this.status,
        startTime: this.startTime,
        endTime: this.endTime,
        pagenum: this.queryInfo.pagenum,
        pagesize: this.queryInfo.pagesize
      }
      console.log(params)
      // 调接口 todo
      const respData = [
        { id: 1, reciptNo: '20212301212312123123', userName: '棉宝宝', phone: '18222331000', status: 0, createTime: '2020-10-14' },
        { id: 2, reciptNo: '20212301212312123123', userName: '222', phone: '18222331281', status: 1, createTime: '2020-10-13' },
        { id: 3, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 0, createTime: '2020-10-14' },
        { id: 4, reciptNo: '20000000000000000000', userName: '222', phone: '13532392392', status: 0, createTime: '2020-10-15' },
        { id: 5, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-16' },
        { id: 5, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-17' },
        { id: 5, reciptNo: '20212301212312123123', userName: '刘亦菲', phone: '13532392392', status: 1, createTime: '2020-10-18' },
        { id: 5, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-19' },
        { id: 5, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-20' },
        { id: 6, reciptNo: '20212301212312123123', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-22' }
      ]
      // 模拟后台数据，用前台实现过滤
      this.dataList = respData
      this.filterList = respData
      this.total = 28
    },
    // 筛选事件
    optionChange (value) {
      console.log(value)
      // 过滤todo
    },
    dateChange (value) {
      console.log(value)
      this.startTime = value[0]
      this.endTime = value[1]
      // 过滤todo
    },
    // 重置选中条件，重新调取数据
    reset () {
      this.keyWord = ''
      this.status = null
      this.startTime = ''
      this.endTime = ''
      this.queryInfo = {
        pagenum: 1,
        pagesize: 10
      }
      this.getdataList()
    },
    // 选中事件
    handleSelectionChange (sel) {
      console.log('selec', sel)
    },
    // 格式化处理某一列的数据，例如状态字段为 0，显示"无”
    formatter (row, column) {
      // console.log(row, column.property)
      if (column.property === 'createTime') {
        return row.createTime + ' 00:00'
      }
      return 'default'
    },

    // 分页组件事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getdataList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getdataList()
    },
    // 增删改查
    createItem () {
      // 弹出form表单窗口，新增一个，新增确认后，追加到列表
      console.log('create')
    },
    view () {
      this.addressVisible = true
    },
    editData (item) {
      console.log('edit')
    },
    deleteData (item) {
      console.log('delete', item)
    },
    addressClosed (par) {
      console.log(par)
    }

  }
}
</script>
<style lang="less" scoped>
.el-cascader {
    width: 100%;
}
</style>
