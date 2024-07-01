<script lang="ts">
import { appStore } from "./stores/appStore";
import pinia from "pinia";

const app = getCurrentInstance();
console.log(app?.appContext.app);
// @ts-expect-error
app.use(pinia);

const test = appStore();
onMounted(() => {
  test.$patch({
    isReady: true,
  });
  console.log(test.isReady);
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>
