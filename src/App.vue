<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    if (!localStorage.getItem('isLoad') && !localStorage.getItem('user')) {
      this.$router.replace({path: '/login'})
    } else {
      this.$store.store.commit('change')
      this.$store.store.commit('user', localStorage.getItem('user'))
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
