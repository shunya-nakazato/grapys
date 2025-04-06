<template>
  <div class="layout">
    <div class="bg-warmgray-400 bg-opacity-20 flex min-h-screen flex-col">
      <div class="w-full flex-1">
        <div class="bg-blue-300">
          <div class="relative flex items-center">
            <div class="w-full items-center">GraphAI Demo</div>
          </div>
        </div>
        <div class="top-0 w-full sm:relative">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "AppLayout",
  components: {},
  setup() {
    const menu = ref(false);

    const toggleMenu = () => {
      menu.value = !menu.value;
    };
    return {
      menu,
      toggleMenu,
    };
  },
});
</script>
