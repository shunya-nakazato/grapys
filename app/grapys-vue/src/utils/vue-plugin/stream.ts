import { AgentFunctionContext, TransactionLog } from "graphai";

import { ref } from "vue";
import { streamAgentFilterGenerator } from "@graphai/agent_filters";

export const useStreamData = () => {
  const streamData = ref<Record<string, string>>({});
  const isStreaming = ref<Record<string, boolean>>({});

  const outSideFunciton = (context: AgentFunctionContext, token: string) => {
    const { nodeId } = context.debugInfo;
    streamData.value[nodeId] = (streamData.value[nodeId] || "") + token;
  };

  const resetStreamData = (nodeId: string) => {
    if (streamData.value[nodeId]) {
      streamData.value[nodeId] = "";
    }
  };

  const streamAgentFilter = streamAgentFilterGenerator<string>(outSideFunciton);

  const streamPlugin = (targetNodeId: string[]) => {
    return (log: TransactionLog) => {
      const { nodeId, state } = log;
      if (targetNodeId.includes(nodeId)) {
        if (state === "completed") {
          isStreaming.value[nodeId] = false;
        }
        if (state === "queued") {
          resetStreamData(nodeId);
        }
        if (state === "executing") {
          isStreaming.value[nodeId] = true;
        }
      }
    };
  };

  return {
    streamData,
    streamAgentFilter,
    resetStreamData,
    streamPlugin,
    isStreaming,
  };
};
