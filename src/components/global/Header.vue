<template>
  <header v-if="menuEnabled" id="top">
    <div id="nav">
      <div class="grid">
        <div class="col-fixed" id="main-logo">
          <router-link :to="{ name: 'About' }"><img alt="Vue logo" src="@/assets/img/logo.png"/></router-link>
        </div>
        <div class="col">
          <TabMenu :model="items" />
        </div>
      </div>
      <div id="logo-mobile" class="mb-2 mt-2">
        <img alt="Vue logo" src="@/assets/img/logo.png" />
      </div>
    </div>
  </header>
</template>

<script>
import globals from "@/globals";
import { computed } from "vue";
import useFlags from "@/modules/common/useFlags";
export default {
  setup() {
    const { flags } = useFlags();

    const menuEnabled = computed(() => flags.menuEnabled);

    const items = globals.menu
    return { menuEnabled, items };
  },
};
</script>

<style>
</style>