<template>
  <div class="list">
    <div class="list-item" v-for="(item,index) in this.list" :key="index" @click="gotoCon">
      <div :data-id="item.id" class="image" :style="{backgroundImage: 'url(' + item.images.large + ')'}"></div>
      {{item.year}}
      <sapn v-for="(items,index) in item.genres" :key="index">
        {{items}}/
      </sapn><br>
      {{item.title}}
    </div>
    <div v-if="this.list.length % 2" class="list-item"></div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    list: Array
  },
  mounted () {
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    div{
      height: 2.1rem;
      width: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
