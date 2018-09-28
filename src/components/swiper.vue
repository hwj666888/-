<template>
  <div class="slide">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in sildeList" :key="index">
          <div @click="gotoCon" :data-id="item.id" class="img" :style="{backgroundImage: 'url(' + item.images.large + ')'}"></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'swiper',
  props: {
    sildeList: Array
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    // eslint-disable-next-line
    let myswiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 2000
      },
      pagination: {
        el: '.swiper-pagination'
      },
      observer: true, /* 修改swiper自己或子元素时，自动初始化swiper */
      observeParents: true /* 修改swiper的父元素时，自动初始化swiper */
    })
  },
  methods: {
    gotoCon (e) {
      this.$router.push({path: '/content?id=' + e.srcElement.dataset.id})
    }
  }
}
</script>

<style scoped lang="scss">
  .slide{
    width: 100%;
    height: 4rem;
    overflow: hidden;
    .swiper-container{
      width: 100%;
      .swiper-wrapper{
        width: 100%;
        .swiper-slide{
          width: 100%;
          .img{
            height: 4rem;
            width: 100%;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center;
          }
        }
      }
    }
  }
</style>
