<template>
  <v-app class="root">
    <dragArea></dragArea>
    <search/>
    <clipboardList/>
  </v-app>
</template>

<script>
import search from '@components/search'
import clipboardList from '@components/clipboardList'
import dragArea from '@components/dragArea'

export default {
  data() {
    return {
      name: 'vue app',
    }
  },
  components: {
    search,
    clipboardList,
    dragArea,
  },
}
</script>

<style lang="less">

</style>
