<template>
  <div class="con">
    <input type="text" v-model="user" placeholder="请输入账号">
    <input type="password" v-model="password" placeholder="请输入密码">
    <mt-button @click="londing" type="large" style="margin-top: 0.2rem;width: 80%">登录</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  name: 'login',
  data () {
    return {
      password: '',
      user: ''
    }
  },
  methods: {
    londing () {
      var that = this
      // eslint-disable-next-line
      if (that.user == 'admin') {
        // eslint-disable-next-line
        if (that.password == '123456') {
          localStorage.setItem('isLoad', true)
          localStorage.setItem('user', that.user)
          that.$store.store.commit('change')
          that.$store.store.commit('user', that.user)
          that.$router.replace({path: '/'})
          Toast('登陆成功')
        } else {
          Toast('请输入正确密码')
          // eslint-disable-next-line
          return
        }
      } else {
        Toast('请输入正确账号')
        // eslint-disable-next-line
        return
      }
    }
  }
}
</script>

<style scoped lang="scss">
.con{
  height: 6.67rem;
  background-image: url("./assets/login-bg.jpg");
  background-repeat: no-repeat;
  background-size: 200% 100%;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  input{
    margin-top: 0.2rem;
    height: 0.3rem;
    border-radius: 0.05rem;
    width: 80%;
    outline: none;
    border: none;
    text-indent: 0.2rem;
    font-size: 0.16rem;
  }
}
</style>
