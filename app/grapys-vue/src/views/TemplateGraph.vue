<template>
  <div>
    <b>Graph Template</b>
    <select class="mt-2 w-full resize-none rounded-md border-2 border-gray-300 p-1 text-black" v-model="template">
      <option v-for="(graph, k) in graphs" :key="k" :value="k">
        {{ graph.name }}
      </option>
    </select>
    <div>
      <button @click="setGraph" class="m-1 cursor-pointer items-center rounded-full bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700">
        Set Graph
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { graphs } from "../graph";

export default defineComponent({
  emits: ["setGraph"],
  setup(__, ctx) {
    const template = ref(0);
    const setGraph = () => {
      ctx.emit("setGraph", graphs[template.value].graph);
    };
    return {
      graphs,
      template,
      setGraph,
    };
  },
});
</script>
