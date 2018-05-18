<template>
  <div class="drag-area component" @mouseup="focusInput"/>
</template>

<script>

export default {
  methods: {
    focusInput() {
      document.querySelector('.search .input-group__input input').focus()
    },
  },
}
</script>

<style lang="less">
.drag-area.component{
  -webkit-app-region:drag;height: 22px;user-select: none;
}
</style>
