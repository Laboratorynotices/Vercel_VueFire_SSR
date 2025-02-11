<script setup lang="ts">
import { useCurrentUser } from "vuefire";
const { data } = await useFetch("/api/hello");
const user = useCurrentUser();
</script>

<template>
  <pre>{{ data }}</pre>
  <pre>{{ user }}</pre>
</template>
