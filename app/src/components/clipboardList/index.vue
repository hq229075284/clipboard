<template>
  <div class="clipboard-list">
    <v-list>
      <template v-for="(one,index) in records">
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
            <v-list-tile-title><div :title="one.content" v-text="one.content" class="ellipse"/></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider :key="`divider-${one.id}`"></v-divider>
      </template>
    </v-list>
  </div>
</template>

<script>
import { clipboard, remote } from 'electron'

export default {
  data() {
    return {
      activeIndex: -1,
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
      remote.getCurrentWindow().hide()
    },
    setActiveIndex(_index) {
      this.activeIndex = _index
      this.$nextTick().then(() => {
        const activeItemDom = this.$el.querySelector('.active')
        if (!activeItemDom) return
        const listDom = this.$el.querySelector('.list')
        const activeTopEdge = activeItemDom.offsetTop
        const activeBottomEdge = activeItemDom.offsetTop + activeItemDom.offsetHeight
        const listTopEdge = listDom.scrollTop
        const listBottomEdge = listDom.scrollTop + listDom.clientHeight
        if (listTopEdge > activeTopEdge && listTopEdge <= activeBottomEdge) { // activeItem下移
          listDom.scrollTop = activeTopEdge
        } else if (listBottomEdge >= activeTopEdge && listBottomEdge < activeBottomEdge) { // activeItem上移
          listDom.scrollTop = activeBottomEdge - listDom.clientHeight
        } else if (listTopEdge >= activeBottomEdge) {
          listDom.scrollTop = activeTopEdge
        } else if (listBottomEdge <= activeTopEdge) {
          listDom.scrollTop = activeBottomEdge - listDom.clientHeight
        }
      })
    },
    listenKeyDown(e) {
      let nextActiveIndex
      if (e.keyCode === 38) {
        nextActiveIndex = this.activeIndex - 1
        if (nextActiveIndex < 0) {
          nextActiveIndex = this.records.length - 1
        }
        this.setActiveIndex(nextActiveIndex)
      } else if (e.keyCode === 40) {
        nextActiveIndex = this.activeIndex + 1
        if (nextActiveIndex === this.records.length) {
          nextActiveIndex = 0
        }
        this.setActiveIndex(nextActiveIndex)
      } else if (e.keyCode === 13) {
        try {
          if (this.records[this.activeIndex].id === this.activeId) {
            this.writeToClipboard(this.records[this.activeIndex])
          }
        } catch (err) {}
      }
    },
  },
  computed: {
    activeId() { return (this.records[this.activeIndex] || {}).id },
    keyword() { return this.$store.state.keyword },
    records() { return this.$store.state.records.filter(one => new RegExp(this.$store.state.keyword, 'i').test(one.content)) },
  },
  watch: {
    keyword() { this.activeIndex = -1 },
  },
}
</script>

<style lang="less">
.clipboard-list{display: flex;flex-direction: column;
  >.list{flex:1 1 auto;overflow-x: hidden;position: relative;padding:0;
    .list__tile--link:hover{background-color: transparent;}
    .active{background-color: rgba(77, 255, 240, 0.5);}
  }
}
</style>
