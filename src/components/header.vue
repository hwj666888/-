<template>
  <div>
    <i @click="goBack" class="goback mint-toast-icon mintui mintui-back"></i>
    <i @click="goCon" class="mint-toast-icon mintui mintui-search"></i>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goCon () {
      this.$router.push({path: '/search'})
    }
  }
}
</script>

<style scoped>
  .goback{
    z-index: 100;
    border-radius: 0.15rem;
    font-size: 0.24rem;
    color: white;
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0.3rem;
    top:0.3rem;
    height: 0.3rem;
    width: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
  }
  .mintui-search{
    z-index: 100;
    position: fixed;
    top:0.3rem;
    right: 0.3rem;
    height: 0.3rem;
    width: 0.3rem;
    border-radius: 0.15rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.3rem;
    color: white;
    background: rgba(0,0,0,0.5);
  }
</style>
