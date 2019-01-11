<template>
   <span class="k-icon k-i-loading loading" v-if="loading">
  </span>

</template>

<script>
  export default {
    name: 'Loading',
    computed: {},
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .loading.k-icon.k-i-loading {
    color: #ff6358;
    font-size: 64px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
</style>
