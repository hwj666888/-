<template>
  <div>
    <div class="title">
      {{title}}
    </div>
    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0">
      <v-List :list="list"></v-List>
      <div v-if="totalList" class="nothing">
        没有了
      </div>
    </div>
  </div>
</template>

<script>
import list from './components/list.vue'
import network from './common/network.js'
import { Indicator } from 'mint-ui'
export default {
  name: 'conlist',
  components: {
    vList: list
  },
  data () {
    return {
      list: [],
      title: '',
      loading: '',
      page: 0,
      size: 20,
      totalList: false
    }
  },
  beforeRouteLeave (to, from, next) {
    console.log(to)
    // eslint-disable-next-line
    if (to.path == "/index") {
      to.meta.keepAlive = false
    } else {
      to.meta.keepAlive = true
    }
    next()
  },
  mounted () {
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    let ids = this.$route.query.id
    network.request({
      url: '/' + ids,
      success: res => {
        this.list = res.data.subjects
        // eslint-disable-next-line
        if (ids = 'in_theaters') {
          this.title = '正在热映'
          // eslint-disable-next-line
        } else if (ids = 'coming_soon') {
          this.title = '即将上映'
          // eslint-disable-next-line
        } else if (ids = 'top250') {
          this.title = 'top250'
          // eslint-disable-next-line
        } else if (ids = 'new_movies') {
          this.title = '新片榜'
        }
        Indicator.close()
      }
    })
    // axios.get('/douban/' + ids).then(res => {
    //   this.list = res.data.subjects
    //   // eslint-disable-next-line
    //   if (ids = 'in_theaters') {
    //     this.title = '正在热映'
    //     // eslint-disable-next-line
    //   } else if (ids = 'coming_soon') {
    //     this.title = '即将上映'
    //     // eslint-disable-next-line
    //   } else if (ids = 'top250') {
    //     this.title = 'top250'
    //     // eslint-disable-next-line
    //   } else if (ids = 'new_movies') {
    //     this.title = '新片榜'
    //   }
    //   Indicator.close()
    // })
  },
  methods: {
    loadMore () {
      let that = this
      if (!that.totalList) {
        if (that.list.length !== 0) {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          })
          that.page = that.page + 1
          network.request({
            url: '/' + this.$route.query.id + '?start=' + that.page * that.size + '&count=' + that.size,
            success: res => {
              that.list = that.list.concat(res.data.subjects)
              if (res.data.subjects.length < that.size) {
                that.totalList = true
                console.log('没有了')
              }
              Indicator.close()
            }
          })
          // axios.get('/douban/' + this.$route.query.id + '?start=' + that.page * that.size + '&count=' + that.size).then(res => {
          //   that.list = that.list.concat(res.data.subjects)
          //   if (res.data.subjects.length < that.size) {
          //     that.totalList = true
          //     console.log('没有了')
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
  }
}
</script>

<style scoped lang="scss">
.title{
  padding-top: 0.1rem;
  font-size: 0.2rem;
  line-height: 0.3rem;
  font-weight: bold;
  font-family: 方正兰亭超细黑简体;
  text-align: center;
}
.nothing{
  padding-top: 0.1rem;
  font-size: 0.2rem;
  font-weight: bold;
  font-family: 方正兰亭超细黑简体;
  text-align: center;
  height: 0.4rem;
  line-height: 0.4rem;
}
.mint-indicator-wrapper,.mint-indicator,.mint-indicator-wrapper{
  height: 0.6rem;
  width: 0.6rem;
}
</style>
