<template>
  <div>
    <v-header></v-header>
    <slide :sildeList="sildeList"></slide>
    <div class="btnBox">
      <button @click="goTo" v-for="(item,index) in this.list" :key="index" :data-url="item.url">
          {{item.name}}
      </button>
    </div>
    <div @click="goToCllect" class="collect">
    </div>
  </div>
</template>

<script>
import slide from './components/swiper.vue'
import header from './components/header'
import network from './common/network.js'
export default {
  name: 'index',
  components: {
    slide,
    vHeader: header
  },
  data () {
    return {
      sildeList: [],
      list: [
        {
          name: '正在热映',
          url: 'in_theaters'
        },
        {
          name: '即将上映',
          url: 'coming_soon'
        },
        {
          name: 'top250',
          url: 'top250'
        },
        {
          name: '新片榜',
          url: 'new_movies'
        }
      ]
    }
  },
  methods: {
    goTo (e) {
      this.$router.push({path: '/conlist', query: {id: e.srcElement.dataset.url}})
    },
    goToCllect () {
      this.$router.push({path: '/collect'})
    }
  },
  created () {
    this.$jsonp('https://douban.uieee.com/v2/movie/top250').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    network.request({
      url: '/in_theaters',
      success: res => {
        res.data.subjects.splice(6)
        this.sildeList = res.data.subjects
      }
    })
    axios.get('/douban/in_theaters').then(res => {
      res.data.subjects.splice(6)
      this.sildeList = res.data.subjects
    })
  }
}
</script>

<style scoped lang="scss">
.btnBox{
  display: flex;
  height: 2.67rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  button{
    border-radius: 0.1rem;
    color: black;
    font-family: "Adobe 仿宋 Std R";
    font-size: 0.16rem;
    border: none;
    height: 0.35rem;
    width: 80%;
    text-align: center;
  }
}
.collect{
  position: fixed;
  bottom: 0.25rem;
  right: 0.25rem;
  height: 0.3rem;
  width: 0.3rem;
  background-image: url("./assets/collecting.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
