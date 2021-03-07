<template>
  <div id="users">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <!-- 搜索框区域 -->
      <div style="margin-top: 15px"></div>
      <el-row :gutter="20">
        <el-col :span="9"
          ><el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="6"
          ><el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 用户列表区域 -->
      <template>
        <el-table :data="usersList" style="width: 100%" stripe border>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="username" label="用户"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChanged(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="top">
                <!-- 编辑按钮 -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="changeUserDialog(scope.row.id)"
                ></el-button>

                <!-- 删除按钮 -->

                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="userDelet(scope.row.id)"
                ></el-button>

                <!-- 设置按钮 -->

                <el-tooltip
                  class="tooltip"
                  effect="dark"
                  content="设置"
                  placement="top"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-setting"
                    size="mini"
                  ></el-button>
                </el-tooltip>
              </div>

              <!-- 编辑按钮 -->
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="adddialogclosed"
    >
      <!-- 对话框主体 -->
      <el-form
        :model="dialogRuleForm"
        :rules="dialogRules"
        ref="dialogRuleFormRef"
        label-width="90px"
      >
        <!-- 添加用户名区域 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogRuleForm.username"></el-input>
        </el-form-item>
        <!-- 添加 密码区域 -->
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="dialogRuleForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 添加邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialogRuleForm.email"></el-input>
        </el-form-item>
        <!-- 添加手机 -->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="dialogRuleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户信息对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="changeUserDialogVisible"
      width="30%"
      @close="changUserDialogClosed"
    >
      <!-- 内容 -->
      <el-form
        :model="changedUserData"
        :rules="dialogRules"
        ref="changedUserDataRef"
        label-width="90px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="changedUserData.username" disabled></el-input>
        </el-form-item>
        <!-- 修改邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="changedUserData.email"></el-input>
        </el-form-item>
        <!-- 修改手机 -->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="changedUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->

      <span slot="footer">
        <el-button @click="changeUserDialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="savaChangeUser(changedUserData)"
          >修 改</el-button
        >
      </span>
    </el-dialog>
    <!-- 删除用户对话框 -->
    <el-dialog
      title="删除用户"
      :visible.sync="DeleteUserDialogVisible"
      width="30%"
    >
      <span>确定删除该用户?</span>
      <span slot="footer">
        <el-button type="primary" @click="DeleteUserDialogVisible = false"
          >取 消</el-button
        >
        <el-button @click="sureDeleteUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      usersList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      dialogVisible: false,
      changeUserDialogVisible: false,
      DeleteUserDialogVisible: false,
      // 添加用户的表单对象
      dialogRuleForm: {
        username: null,
        password: null,
        email: null,
        mobile: null,
      },
      // 添加用户的验证规则
      dialogRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
          { min: 11, max: 11, message: "11位数字", trigger: "blur" },
        ],
      },
      // 编辑的当前用户的数据
      changedUserData: {},
      //当前选择删除的用户id
      deleteUserId: null,
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    //更新页面数据
    async getUsersList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });

      if (res.meta.status != 200) {
        return this.$message.error("获取用户列表失败");
      } else {
        this.total = res.data.total;
        this.usersList = res.data.users;
        // console.log(this.total);
      }
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUsersList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUsersList();
    },
    async userStateChanged(changeValue) {
      // console.log(typeof changeValue.mg_state);

      const { data: res } = await this.$http.put(
        `users/${changeValue.id}/state/${changeValue.mg_state}`
      );
      // console.log(res);
      if (res.meta.status != 200) {
        return this.$message.error("设置用户状态失败!");
      } else {
        return this.$message.success("设置用户状态成功!");
      }
    },
    // 对话框关闭后将输入内容清空
    adddialogclosed() {
      this.$refs.dialogRuleFormRef.resetFields();
    },
    changUserDialogClosed() {
      this.$refs.changedUserDataRef.resetFields();
    },
    // 对话框添加用户前预校验
    addUser() {
      this.$refs.dialogRuleFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "users",
          this.dialogRuleForm
        );
        if (res.meta.status != 201) {
          return this.$message.error("用户创建失败!");
        } else {
          this.getUsersList();
          return this.$message.success("创建成功!");
        }
      });
    },
    //编辑对话框处理
    async changeUserDialog(id) {
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status != 200) {
        return this.$message.error("获取用户数据失败!");
      } else {
        this.changedUserData = res.data;
        console.log(this.changedUserData);
      }
      this.changeUserDialogVisible = true;
    },
    //保存编辑的用户
    savaChangeUser(changedUserData) {
      this.$refs.changedUserDataRef.validate(async (valid) => {
        if (!valid) return;

        const { data: res } = await this.$http.put(
          `users/${changedUserData.id}`,
          changedUserData
        );
        if (res.meta.status != 200) {
          return this.$message.error("用户修改失败!");
        } else {
          this.getUsersList();
          return this.$message.success("修改成功!");
        }
      });
    },
    //删除用户
    userDelet(id) {
      this.deleteUserId = id;
      this.DeleteUserDialogVisible = true;
    },
    //确定删除用户
    async sureDeleteUser() {
      const { data: res } = await this.$http.delete(
        `users/${this.deleteUserId}`
      );
      if (res.meta.status != 200) {
        return this.$message.error("删除失败!");
      } else {
        this.$message.success("删除成功!");
        this.getUsersList();
      }
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.top {
  text-align: center;
}
.tooltip {
  width: 44px;
  height: 28px;
}
</style>