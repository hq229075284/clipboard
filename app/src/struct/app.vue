<template>
  <v-app class="root">
    <search/>
    <clipboardList/>
  </v-app>
</template>

<script>
import search from '@components/search'
import clipboardList from '@components/clipboardList'

export default {
  data() {
    return {
      name: 'vue app',
    }
  },
  components: {
    search,
    clipboardList,
  },
}
</script>

<style lang="less">

</style>
