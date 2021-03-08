<template>
  <div id="login_container">
    <div class="login_box">
      <!-- 登录头像区域 -->
      <div class="avator_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登陆表单区域 -->
      <el-form
        ref="loginformRef"
        class="loginform"
        :model="login_form"
        :rules="loginform_rules"
        label-width="0px"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="login_form.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" ref="passwordRef">
          <el-input
            type="password"
            prefix-icon="iconfont icon-3702mima"
            v-model="login_form.password"
          ></el-input>
        </el-form-item>
        <el-row class="login_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="loginformRetset">重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login_form: {
        username: "",
        password: "",
      },
      loginform_rules: {
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
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    loginformRetset() {
      // console.log(this);
      this.$refs.loginformRef.resetFields();
    },
    login() {
      this.$refs.loginformRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.login_form);

        if (res.meta.status !== 200) {
          this.loginFail();
        } else {
          this.loginSuccess();
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        }
      });
    },
    loginSuccess() {
      this.$message({
        showClose: true,
        message: "登陆成功!",
        type: "success",
      });
    },

    loginFail() {
      this.$message({
        showClose: true,
        message: "用户名或密码错误，请重新登录!",
        type: "error",
      });
      this.$refs.passwordRef.resetField();
    },
  },
};
</script>

<style scoped>
#login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #ffff;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avator_box {
  height: 130px;
  width: 130px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;

  transform: translate(-50%, -50%);
}
.avator_box img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.login_box .loginform {
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
}

.login_btn {
  display: flex;
  justify-content: flex-end;
}
</style>