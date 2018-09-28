<template>
  <div class="con">
    <div class="collect" @click="collectChange">
      <img v-if="!collect" src="./assets/collect.png">
      <img v-else src="./assets/collecting.png">
    </div>
    <div class="img">
      <img :src="msg.image">
    </div>
    <div class="title">
      {{msg.alt_title}}/{{msg.attrs.year[0]}}<br>
      {{msg.attrs.country[0]}}&nbsp;&nbsp;{{msg.attrs.language[0]}}/{{msg.attrs.language[1]}}<br>
      <span v-for="(items,index) in msg.attrs.movie_type" :key="index">{{items}}/</span>
    </div>
    <p>
      {{msg.summary}}
    </p>
  </div>
</template>

<script>
import network from './common/network.js'
import { Toast } from 'mint-ui'
export default {
  name: 'content',
  methods: {
    collectChange () {
      var that = this
      var storageKeyName = that.$store.store.state.user + that.$route.query.id
      if (!localStorage.getItem(storageKeyName)) {
        that.collect = true
        localStorage.setItem(storageKeyName, JSON.stringify(that.msg))
        Toast({
          message: '收藏成功',
          iconClass: 'icon icon-success'
        })
      } else if (localStorage.getItem(storageKeyName)) {
        that.collect = false
        localStorage.removeItem(storageKeyName)
        Toast({
          message: '取消收藏'
        })
      }
    }
  },
  data () {
    return {
      msg: {},
      collect: false
    }
  },
  mounted () {
    network.request({
      url: this.$route.query.id,
      success: res => {
        var that = this
        that.msg = res.data
        that.msg.id = that.$route.query.id
        var storageKeyName = that.$store.store.state.user + that.$route.query.id
        if (!localStorage.getItem(storageKeyName)) {
          that.collect = false
        } else if (localStorage.getItem(storageKeyName)) {
          that.collect = true
        }
      }
    })
    // axios.get('douban/' + this.$route.query.id).then(res => {
    //   var that = this
    //   that.msg = res.data
    //   that.msg.id = that.$route.query.id
    //   var storageKeyName = that.$store.store.state.user + that.$route.query.id
    //   if (!localStorage.getItem(storageKeyName)) {
    //     that.collect = false
    //   } else if (localStorage.getItem(storageKeyName)) {
    //     that.collect = true
    //   }
    // })
  }
}
</script>

<style scoped lang="scss">
.con{
  font-size: 0.14rem;
  p{
    text-indent: 0.28rem;
    margin-left: 2.5%;
    width: 95%;
  }
  .title{
    line-height: 0.2rem;
    text-align: center;
    margin-bottom: 0.1rem;
  }
  .img{
    padding-top: 0.2rem;
    padding-bottom: 0.1rem;
    display: flex;
    justify-content: center;
  }
  .collect{
    width: 0.3rem;
    height: 0.3rem;
    position: fixed;
    bottom: 0.4rem;
    right: 0.4rem;
    img{
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
    }
  }
}
</style>
