<script setup lang="ts">
const src = 'https://jupyter.org/'
</script>

<template>

  <div class="iframeContent">
    <iframe class="wh-full" :src="src"></iframe>
  </div>
</template>

<style scoped lang="scss">

.iframeContent {
    height: 550px;

    .wh-full {
        width: 100%;
        height: 95%;
    }
}
</style>