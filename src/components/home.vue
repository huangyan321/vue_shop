<template>
  <div id="home">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/cat.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="backBtn">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="collapseCheck ? '64px' : '200px'">
          <div class="collepseBtn" @click="collepseClick">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409bff"
            :unique-opened="true"
            :collapse="collapseCheck"
            :collapse-transition="false"
            router
            :default-active="activeMenu"
          >
            <!-- 一级菜单 -->
            <el-submenu
              :index="'/' + item.path"
              v-for="item in menuList"
              :key="item.id"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 一级菜单icon图标 -->
                <i :class="iconList[item.id]"></i>
                <!-- 一级菜单文本 -->
                <span>{{ item.authName }}</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item
                :index="'/' + items.path"
                v-for="items in item.children"
                :key="items.id"
                @click="activeMenuClick('/' + items.path)"
                ><template slot="title">
                  <!--二级菜单icon图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 二级菜单文本 -->
                  <span>{{ items.authName }}</span>
                </template></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',

  data () {
    return {
      menuList: [],
      iconList: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      collapseCheck: false,

      activeMenu: null
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    backBtn () {
      window.sessionStorage.clear()
      this.$router.replace('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status != 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    collepseClick () {
      this.collapseCheck = !this.collapseCheck
    },
    // 用sessionStorage保存当前激活菜单
    activeMenuClick (state) {
      // console.log(state);
      window.sessionStorage.setItem('activeMenu', state)
      this.activeMenu = window.sessionStorage.getItem('activeMenu')
    }
  }
}
</script>

<style scoped>
#home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
span {
  margin-left: 20px;
}
.el-header img {
  height: 60px;
  border-radius: 10px;
}
.el-aside {
  background-color: #333744;
}
.collepseBtn {
  height: 24px;
  background-color: #4a5064;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  letter-spacing: 0.3em;
}
.el-menu {
  border-right: 0;
}
.el-main {
  background-color: #eaedf1;
}
</style>
