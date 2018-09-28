<template>
  <div class="search">
    <div class="text">
      <input v-model="searchText" type="text" placeholder="请输入搜索内容" @keyup.enter="searchMsg">
      <div @click="searchMsg">搜索</div>
    </div>
    <v-List :list="list"></v-List>
    <div v-if="totalList" class="nothing">
      没有了
    </div>
  </div>
</template>

<script>
import list from './components/list.vue'
import network from './common/network.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'search',
  components: {
    vList: list
  },
  data () {
    return {
      searchText: '',
      list: [],
      scrollBotton: false,
      page: 0,
      size: 20,
      totalList: false
    }
  },
  methods: {
    searchMsg () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      network.request({
        url: '/search?q=' + this.searchText,
        success: res => {
          this.list = res.data.subjects
          Indicator.close()
        }
      })
      // axios.get('/douban/search?q=' + this.searchText).then(res => {
      //   this.list = res.data.subjects
      //   Indicator.close()
      // })
    },
    handleScroll () {
      let that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let scrollHeight = document.getElementsByClassName('search')[0].scrollHeight
      let clientHeight = document.documentElement.clientHeight
      if (!that.totalList) {
        if (scrollTop + clientHeight === scrollHeight) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          that.page = that.page + 1
          network.request({
            url: '/search?q=' + that.searchText + '&start=' + that.page * that.size + '&count=' + that.size,
            success: res => {
              this.list = this.list.concat(res.data.subjects)
              Indicator.close()
              if (res.data.subjects.length < that.size) {
                that.totalList = true
              } else {
                // eslint-disable-next-line
                return
              }
            }
          })
          // axios.get('/douban/search?q=' + that.searchText + '&start=' + that.page * that.size + '&count=' + that.size).then(res => {
          //   this.list = this.list.concat(res.data.subjects)
          //   if (res.data.subjects.length < that.size) {
          //     that.totalList = true
          //   } else {
          //     // eslint-disable-next-line
          //     return
          //   }
          // })
        } else {
          // eslint-disable-next-line
          return
        }
      } else {
        // eslint-disable-next-line
        return
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="scss">
.search{
  z-index: 1000;
  font-size: 0.16rem;
  .text{
    background: buttonface;
    display: flex;
    align-items: center;
    height: 0.4rem;
    line-height: 0.4rem;
    width: 100%;
    div{
      display: inline-block;
    }
    input{
      text-indent: 0.1rem;
      margin-left: 0.05rem;
      margin-right: 0.1rem;
      width: 3.2rem;
      height: 0.3rem;
      border: none;
    }
  }
  .nothing{
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
  }
}
</style>
