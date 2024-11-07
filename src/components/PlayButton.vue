<script setup lang="ts">
  const restart = () => {
    location.reload();
  };
</script>

<template>
  <button class="play-again" @click="restart">Play Again?</button>
</template>
