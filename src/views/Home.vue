<template>
    <el-container class="home-container">
        <!-- 头部 -->
        <el-header>
            <div>
                <!-- <img style="margin-left: 15px" src="@/assets/logo.png" alt="" /> -->
                <span style="margin-left: 20px">电商后台管理系统欢迎您</span>
            </div>
            <div></div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 主体内容 -->
        <el-container>
            <!-- 侧边栏内容 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu
                    class="el-menu-vertical-demo"
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409fff"
                    :unique-opened="true"
                    :collapse="isCollapse"
                    :collapse-transition="false"
                    :router="true"
                    :default-active="activePath"
                >
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                        <!-- 一级菜单的模板区 -->
                        <template slot="title">
                            <!-- 图标 -->
                            <i :class="iconsObj[item.id]"></i>
                            <!-- 文本 -->
                            <span>{{ item.authName }}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item
                            :index="'/' + subItem.path"
                            v-for="subItem in item.children"
                            :key="subItem.id"
                            @click="saveNavState('/' + subItem.path)"
                        >
                            <template slot="title">
                                <!-- 图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 文本 -->
                                <span>{{ subItem.authName }}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 显示内容 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data () {
    return {
      menuList: [], // 左侧菜单数据
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: '' // 被激活的链接地址
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  mounted () {},
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取菜单
    getMenuList () {
    //   this.$api.getMenuList()
    //     .then(res => {
    //       console.log(res)
    //       if (res.data.meta.status !== 200) {
    //         this.$message.error(res.meta.msg)
    //         return
    //       }
    //       this.menuList = res.data.data
    //     })
    //     .catch(() => {
    //     })
      const res = {
        'data': [
          { 'id': 125,
            'order': 1,
            'authName': '用户管理',
            'path': 'users',
            'children': [{ 'id': 110, 'authName': '用户列表', 'path': 'users', 'children': [], 'order': null }]
          },
          { 'id': 103,
            'order': 2,
            'authName': '权限管理',
            'path': 'rights',
            'children': [
              { 'id': 111, 'authName': '角色列表', 'path': 'roles', 'children': [], 'order': null },
              { 'id': 112, 'authName': '权限列表', 'path': 'rights', 'children': [], 'order': null }]
          },
          { 'id': 101,
            'order': 3,
            'authName': '商品管理',
            'path': 'goods',
            'children': [
              { 'id': 104, 'authName': '商品列表', 'path': 'goods', 'children': [], 'order': 1 },
              { 'id': 115, 'authName': '分类参数', 'path': 'params', 'children': [], 'order': 2 },
              { 'id': 121, 'authName': '商品分类', 'path': 'categories', 'children': [], 'order': 3 }]
          },
          { 'id': 102,
            'order': 4,
            'authName': '订单管理',
            'path': 'orders',
            'children': [{ 'id': 107, 'authName': '订单列表', 'path': 'orders', 'children': [], 'order': null }]
          },
          { 'id': 145,
            'order': 5,
            'authName': '数据统计',
            'path': 'reports',
            'children': [{ 'id': 146, 'authName': '数据报表', 'path': 'reports', 'children': [], 'order': null }]
          }
        ],
        'meta': { 'msg': '获取菜单列表成功', 'status': 200 } }
      this.menuList = res.data
    },
    // 点击按钮切换菜单的折叠展开事件
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
    height: 100%;
}
.el-header {
    background-color: #333744;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        img {
            width: 60px;
            height: 60px;
        }
        span {
            margin-left: 15px;
        }
    }
}
.el-aside {
    background-color: #333744;
    .el-menu {
        border-right: none;
    }
}
.el-main {
    background-color: #eaedf1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em; //增加或减少字符间的空白
    cursor: pointer;
}
</style>
