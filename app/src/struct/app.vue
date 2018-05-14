<template>
  <div class="title" v-text="this.name" />
</template>

<script>
export default {
  data() {
    return { name: "vue app" };
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style lang="less" scoped>
.title {
  color: red;
}
</style>
