<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 登录头像 -->
      <div class="avator_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <div>
        <!-- 表单 -->
        <el-form
          ref="loginFormRef"
          :model="form"
          :rules="loginFormRules"
          label-width="0px"
          class="login_form"
        >
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>

          <!--  密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              prefix-icon="el-icon-help"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单数据绑定对象
      form: {
        username: '',
        password: '',
      },
      // 这个表单的规则对象
      loginFormRules: {
        //验证用户名
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '用户名长度在 5 到 10 个字符',
            trigger: 'blur',
          },
        ],
        //验证密码
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '密码长度在 5 到 10 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    //表单重置函数
    resetLoginForm() {
      //console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    //登录
    login() {
      //登录校验  箭头函数一个参数可以省略小括号
      this.$refs.loginFormRef.validate(async (valid) => {
        //console.log(valid)
        if (!valid) return
        const { data: result } = await this.$http.post(
          'login',
          this.qs.stringify(this.form)
        )
        //console.log(result);
        if (result.code != 200)
          return this.$message.error('登录失败，账户/密码错误') //this.loginFiled();
        //alert("登录成功");
        this.$message.success('登录成功')
        // 保存token
        window.sessionStorage.setItem('token', result.data.token)
        // 通过编程式导航跳转页面
        this.$router.push('/home')
        //this.loginSuccess();
      })
    },

    // 登录提示
    loginSuccess() {
      this.$notify({
        title: '登陆成功',
        message: '正在跳转页面...',
        type: 'success',
      })
    },
    loginFiled() {
      this.$notify.error({
        title: '登陆失败',
        message: '账户/密码错误',
      })
    },
  },
}
</script>

<style lang='less' scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avator_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>