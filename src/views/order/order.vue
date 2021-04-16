<template>
<div>
    <!-- 卡片视图 -->
    <el-card>
        <el-row>
            <el-col :span="8">
                <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 订单列表数据 -->
        <el-table :data="dataList" border stripe>
            <el-table-column type="index" label="#" align="center"></el-table-column>
            <el-table-column
                label="订单标号" prop="reciptNo"     align="center"
            ></el-table-column>
            <el-table-column
                label="联系方式"  prop="phone"  align="center" >
            </el-table-column>
            <el-table-column   label="下单人"  prop="userName"  align="center" >
            </el-table-column>
            <el-table-column label="是否付钱" prop="status" align="center">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status === 1">已付款</el-tag>
                    <el-tag type="danger" v-if="scope.row.status === 0">未付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="下单时间" prop="createTime" align="center">
                <template slot-scope="scope">
                    {{ scope.row.createTime }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                        icon="el-icon-edit"
                        type="primary"
                        size="mini"
                        @click="showBox"
                    ></el-button>
                    <el-button
                        icon="el-icon-location"
                        type="success"
                        size="mini"
                        @click="showProgressBox(scope.row)"
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
      queryInfo: {
        kewWord: '', // 模糊查询
        status: null, //  true,false,null表示全部
        startTime: '',
        endTime: '',
        pagenum: 1, // 页码
        pagesize: 10 // 每页显示条数
      },
      total: 0,

      dataList: [],

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
    getdataList () {
      const params = this.queryInfo
      console.log(params)
      // 调接口 todo
      this.dataList = [
        { id: 1, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 0, createTime: '2020-10-12' },
        { id: 2, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-12' },
        { id: 3, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 0, createTime: '2020-10-12' },
        { id: 4, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 0, createTime: '2020-10-12' },
        { id: 5, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-12' },
        { id: 6, reciptNo: '202123012', userName: '222', phone: '13532392392', status: 1, createTime: '2020-10-12' }
      ]
      this.total = 28
    },

    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getdataList()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getdataList()
    },
    // 展示修改地址的对话框
    showBox () {
      this.addressVisible = true
    },
    // 弹框关闭事件
    addressClosed () {
      this.$refs.addressFormRef.resetFields()
    },
    // 查看物流
    showProgressBox () {
      this.$http.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
      this.$http.get('/kuaidi/YT4781863654577').then(res => {
        console.log('落落落落')
        console.log(res.data.data)
        this.timeList = res.data.data
      })
      this.progressVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.el-cascader {
    width: 100%;
}
</style>
