<template>
  <div class="clipboard-list">
    <v-list>
      <template v-for="(one,index) in filterRecords">
        <v-list-tile
          @click="writeToClipboard(one)"
          :key="one.id"
          :class="`${one.id === activeId ? 'active' : ''}`"
          @mouseenter="setActiveIndex(index)"
        >
          <v-list-tile-action>
            <v-icon>{{ one.icon||'bookmark' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><div :title="one.content" v-text="one.content"/></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="`divider-${one.id}`"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import { clipboard } from 'electron'

export default {
  data() {
    return {
      activeIndex: -1,
      records: [
        { id: 1, content: '123123123123123123123123123123123123123123123123123' },
        { id: 2, content: '456' },
        { id: 3, content: '789' },
        { id: 4, content: 'a' },
        { id: 5, content: 'b' },
        { id: 6, content: 'c' },
        { id: 7, content: 'd' },
        { id: 8, content: 'e' },
        { id: 9, content: 'f' },
      ],
    }
  },
  mounted() {
    window.addEventListener('keydown', this.listenKeyDown)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.listenKeyDown)
  },
  methods: {
    writeToClipboard(_one) {
      clipboard.writeText(_one.content)
    },
    setActiveIndex(_index) {
      this.activeIndex = _index
    },
    listenKeyDown(e) {
      if (e.keyCode === 38) {
        this.activeIndex -= 1
        if (this.activeIndex < 0) {
          this.activeIndex = this.records.length - 1
        }
      } else if (e.keyCode === 40) {
        this.activeIndex += 1
        if (this.activeIndex === this.records.length) {
          this.activeIndex = 0
        }
      } else if (e.keyCode === 13) {
        try {
          if (this.filterRecords[this.activeIndex].id === this.activeId) {
            this.writeToClipboard(this.filterRecords[this.activeIndex])
          }
        } catch (err) {}
      }
    },
  },
  computed: {
    activeId() { return (this.records[this.activeIndex] || {}).id },
    keyword() { return this.$store.state.keyword },
    filterRecords() { return this.records.filter(one => new RegExp(this.$store.state.keyword, 'i').test(one.content)) },
  },
  watch: {
    keyword() { this.activeIndex = -1 },
  },
}
</script>

<style lang="less">
.clipboard-list{display: flex;flex-direction: column;
  >.list{flex:1 1 auto;overflow-x: hidden;
    .list__tile--link:hover{background-color: transparent;}
    .active{background-color: rgba(77, 255, 240, 0.5);}
  }
}
</style>
