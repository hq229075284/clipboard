<template>
  <v-app class="root">
    <search/>
    <clipboardList :dataSource="this.dataSource"/>
  </v-app>
</template>

<script>
import search from '@components/search'
import clipboardList from '@components/clipboardList'

export default {
  data() {
    return {
      name: 'vue app',
      dataSource: [{ id: '1', content: '123' }],
    };
  },
  mounted() {
    console.log('mounted')
  },
  components: {
    search,
    clipboardList,
  },
};
</script>

<style lang="less" scoped>

</style>
