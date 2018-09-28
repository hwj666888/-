<template>
  <div class="list">
    <div class="list-item" v-for="(item,index) in list" :key="index" @click="gotoCon">
      <div :data-id="item.id" class="image" :style="{backgroundImage: 'url(' + item.image + ')'}"></div>
      {{item.attrs.country[0]}}
      <sapn v-for="(items,index) in item.attrs.movie_type" :key="index">
        {{items}}/
      </sapn>
      <span class="rating">
        {{item.rating.average ? item.rating.average : '暂无评分'}}
      </span><br>
      {{item.title}}
    </div>
    <div v-if="list.length % 2" class="list-item"></div>
  </div>
</template>

<script>
export default {
  name: 'collect',
  data () {
    return {
      list: []
    }
  },
  created () {
    var that = this
    var key = Object.keys(localStorage)
    for (var i = 0; i < key.length; i++) {
      if (localStorage.getItem(key[i])) {
        that.list.push(JSON.parse(localStorage.getItem(key[i])))
        console.log(that.list)
      }
    }
  },
  methods: {
    gotoCon (e) {
      this.$router.push({path: '/content?id=' + e.srcElement.dataset.id})
    }
  }
}
</script>

<style scoped lang="scss">
  .list{
    margin-top: 0.1rem;
    font-family: "Adobe 仿宋 Std R";
    width: 100%;
    font-size: 0.14rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .list-item{
      text-align: center;
      width: 47%;
      height: 2.5rem;
      div{
        height: 2.1rem;
        width: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      span{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .rating{
        float: right;
      }
    }
  }
</style>
