<template>
  <div class="Safety-page">
    <el-card class="box-card" style="height: 230px">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <el-form ref="ruleFormRef" :model="password" :rules="rules" label-position="top">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="password.password" placeholder="请输入新密码" show-password type="password"/>
        </el-form-item>
        <div flex>
          <el-button mlauto type="primary" @click="reset_pass(ruleFormRef)">修改</el-button>
        </div>
      </el-form>
    </el-card>
    <!--     -->
    <el-card v-if="false" class="box-card" style="height:455px">
      <div slot="header" class="clearfix">
        <span>修改账号</span>
      </div>
      <el-form label-position="top">
        <el-form-item label="新账号">
          <el-input v-model="account.account" placeholder="邮箱 / 手机号码" type="password"/>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="account.oldCode" placeholder="当前账号验证码" type="password">
            <template #append>
              <el-button>获取</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="新账号验证码">
          <el-input v-model="account.code" placeholder="新账号验证码" type="password">
            <template #append>
              <el-button>获取</el-button>
            </template>
          </el-input>
        </el-form-item>
        <div flex>
          <el-button mlauto type="primary">修改</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {resetPass} from "../../api/user";
import Momery from "../../util/Momery";

const ruleFormRef = ref();
const password = reactive({
  password: ''
})
const account = reactive({
  account: '',
  code: '',
  oldCode: ''
})
const rules = {
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
  ],
}
const reset_pass = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      sendPass()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const sendPass = async () => {
  try {
    await ElMessageBox({
      title: '操作提示',
      message: "您确认修改你的密码？修改后需重新登录",
      showCancelButton: true
    });
    const {code, msg} = await resetPass({password: password.password})
    if (code === 200) {
      ElMessage.success(msg)
      Momery.del("token").del("info");
      location.reload()
    } else {
      ElMessage.error(msg)
    }
  } catch (e) {
  }
}
</script>

<style lang="scss" scoped>
.Safety-page {
  background-color: #fff;
  margin: 15px;
  padding: 15px;
  min-height: calc(100% - 60px);
  display: flex;
  flex-wrap: wrap;

  > .box-card {
    margin-right: 15px;
    margin-bottom: 15px;
    width: 400px;

    .clearfix {
      margin-bottom: 20px;
    }
  }
}
</style>
