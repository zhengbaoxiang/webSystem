<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
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
            <el-table :data="orderList" border stripe>
                <el-table-column type="index" label="#" align="center"></el-table-column>
                <el-table-column
                    label="订单标号"
                    prop="order_number"
                    align="center"
                ></el-table-column>
                <el-table-column
                    label="订单价格"
                    prop="order_price"
                    align="center"
                ></el-table-column>
                <el-table-column label="是否付款" prop="pay_status" align="center">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.pay_status == '1'">已付款</el-tag>
                        <el-tag type="danger" v-if="scope.row.pay_status == '0'">未付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否发货" prop="is_send" align="center"></el-table-column>
                <el-table-column label="下单时间" prop="create_time" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.create_time | dateFormat }}
                    </template>
                </el-table-column>
                <el-table-column label="查看物流" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button
                            icon="el-icon-edit"
                            type="primary"
                            size="mini"
                            @click="showBox"
                        ></el-button> -->
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
import cityData from './citydata.js';
export default {
    data() {
        return {
            queryInfo: {
                query: '', //查询条件
                pagenum: 1, //页码
                pagesize: 10, //每页显示条数
            },
            total: 0,
            orderList: [],
            addressVisible: false,
            addressForm: {
                address1: [],
                address2: '',
            },
            addressFormRules: {
                address1: [{ required: true, message: '请选择选择省市区县', trigger: 'blur' }],
                address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
            },
            cityData,
            progressVisible: false,
            reverse: false,
            timeList: [],
        };
    },
    created() {
        this.getOrderList();
    },
    methods: {
        getOrderList() {
            this.$http
                .get('orders', {
                    params: this.queryInfo,
                })
                .then(res => {
                    if (res.data.meta.status != 200) {
                        return this.$message.error('获取订单列表失败!!!');
                    }
                    console.log(res.data);
                    this.orderList = res.data.data.goods;
                    this.total = res.data.data.total;
                });
        },
        handleSizeChange(newSize) {
            this.queryInfo.pagesize = newSize;
            this.getOrderList();
        },
        handleCurrentChange(newPage) {
            this.queryInfo.pagenum = newPage;
            this.getOrderList();
        },
        //展示修改地址的对话框
        showBox() {
            this.addressVisible = true;
        },
        //弹框关闭事件
        addressClosed() {
            this.$refs.addressFormRef.resetFields();
        },
        // 查看物流
        showProgressBox() {
            this.$http.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/';
            this.$http.get('/kuaidi/YT4781863654577').then(res => {
                console.log('落落落落');
                console.log(res.data.data);
                this.timeList = res.data.data;
            });
            this.progressVisible = true;
        },
    },
};
</script>
<style lang="less" scoped>
.el-cascader {
    width: 100%;
}
</style>