<template>
  <div>
    <div class="items-center justify-center text-center">
      <div class="mt-2">
        <chat :messages="messages" :is-streaming="isStreaming" :stream-data="streamData" :stream-node-ids="streamNodes" />
      </div>
      <div class="mt-2">
        <button
          class="m-1 cursor-pointer items-center rounded-full px-4 py-2 font-bold text-white hover:bg-sky-700"
          @click="run"
          :disabled="isRunning"
          :class="isRunning ? 'bg-sky-200' : 'bg-sky-500'"
        >
          Run
        </button>
        <button
          class="m-1 cursor-pointer items-center rounded-full px-4 py-2 font-bold text-white hover:bg-sky-700"
          @click="abort"
          :disabled="!isRunning"
          :class="!isRunning ? 'bg-sky-200' : 'bg-sky-500'"
        >
          Stop
        </button>
      </div>

      <div>
        <div class="m-auto my-4 w-10/12">
          <div v-if="events.length > 0" class="hidden font-bold text-red-600">Write message to bot!!</div>
          <div class="flex">
            <input v-model="userInput" class="flex-1 rounded-md border-2 p-2" :disabled="events.length == 0" />
            <button
              class="ml-1 flex-none cursor-pointer items-center rounded-md px-4 py-2 font-bold text-white hover:bg-sky-700"
              :class="events.length == 0 ? 'bg-sky-200' : 'bg-sky-500'"
              @click="submitText(events[0])"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div v-if="!ready">Loading web llm model</div>
      <div v-else>Ready!</div>
      <div>
        {{ loading }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { GraphAI } from "graphai";

import { useStore } from "../store";

import { useStreamData } from "../utils/vue-plugin/stream";
import { useChatPlugin } from "../utils/vue-plugin/chat";
import { useGraphAIResult } from "../utils/vue-plugin/result";

import Chat from "../components/Chat.vue";

import * as agents from "@graphai/vanilla";
import { openAIAgent, openAIImageAgent } from "@graphai/openai_agent";
import { geminiAgent } from "@graphai/gemini_agent";
import { anthropicAgent } from "@graphai/anthropic_agent";
import { browserlessAgent } from "@graphai/browserless_agent";

import tinyswallowAgent, { modelLoad, loadEngine, CallbackReport } from "../agents/tinyswallow";
import { textInputEvent } from "../agents/event";

import { graphConfigs } from "../graph";

export default defineComponent({
  components: {
    Chat,
  },
  setup() {
    const isRunning = ref(false);
    const store = useStore();
    loadEngine();

    const { eventAgent, userInput, events, submitText, clearEvents } = textInputEvent();
    const { messages, chatMessagePlugin } = useChatPlugin();
    const { streamData, streamAgentFilter, streamPlugin, isStreaming } = useStreamData();
    const { graphAIResultPlugin } = useGraphAIResult();

    const agentFilters = [
      {
        name: "streamAgentFilter",
        agent: streamAgentFilter,
      },
    ];

    let graphai: GraphAI | null = null;
    const run = async () => {
      isRunning.value = true;
      graphai = new GraphAI(
        store.graphData,
        {
          ...agents,
          openAIAgent,
          openAIImageAgent,
          anthropicAgent,
          geminiAgent,
          eventAgent,
          tinyswallowAgent,
          browserlessAgent,
        },
        {
          agentFilters,
          config: graphConfigs,
        },
      );
      graphai.registerCallback(streamPlugin(store.streamNodes));
      graphai.registerCallback(chatMessagePlugin(store.resultNodes));
      graphai.registerCallback(graphAIResultPlugin(store.setResult));
      graphai.onLogCallback = ({ nodeId, state, inputs, result }) => {
        console.log({ nodeId, state, inputs, result });
      };

      try {
        await graphai.run();
      } catch (error) {
        console.log(error);
      } finally {
        isRunning.value = false;
      }
    };
    const abort = () => {
      try {
        if (isRunning.value && graphai) {
          graphai.abort();
          clearEvents();
          graphai = null;
        }
      } catch (error) {
        console.log(error);
      } finally {
        isRunning.value = false;
      }
    };
    const streamNodes = computed(() => {
      return store.streamNodes;
    });
    const loading = ref("");
    const ready = ref(false);
    modelLoad((report: CallbackReport) => {
      if (report.progress === 1) {
        ready.value = true;
      }
      loading.value = report.text;
      console.log(report.text);
    });

    return {
      run,
      abort,
      isRunning,

      streamData,
      isStreaming,

      submitText,
      userInput,
      messages,
      events,
      streamNodes,

      loading,
      ready,
    };
  },
});
</script>
