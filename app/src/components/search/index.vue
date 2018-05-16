<template>
<div class="search">
  <v-toolbar dark color="primary" flat>
    <v-text-field
      prepend-icon="search"
      hide-details
      single-line
      class="input-search"
      color=""
      @keyup="onChangeSearch"
      @compositionstart="lockSearch"
      @compositionend="unlockSearch"
      :value="keyword"
    />
  </v-toolbar>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      // keyword: '',
    }
  },
  methods: {
    onChangeSearch(e) {
      if (!this.lock) {
        console.log('trigger search')
        this.$store.commit('setKeyword', e.target.value)
        // console.log(this.keyword)
      }
    },
    lockSearch() {
      // console.info('lock')
      this.lock = true
    },
    unlockSearch() {
      // console.info('unlock')
      this.lock = false
    },
  },
  computed: {
    keyword() { return this.$store.state.keyword || '' },
  },
  // computed: mapState({
  //   keyword: 'keyword',
  // }),
}
</script>

<style lang="less" scoped>
.search{
  .input-search{color:#fff;
    // &.input-group--focused{color:#c7c51b;}
  }
}
</style>

