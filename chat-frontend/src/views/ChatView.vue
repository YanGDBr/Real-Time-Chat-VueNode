<template>
  <Suspense>
    <template #default>
      <ChatAsync/>
    </template>
    <template #fallback>
        <h1>Loading...</h1>
    </template>

  </Suspense>
</template>

<script setup>
import ChatAsync from '@/components/ChatAsync.vue';

</script>



<style scoped>


</style>
