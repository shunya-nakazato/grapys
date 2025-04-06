import { useState, useCallback } from "react";
import { AgentFunctionContext, TransactionLog } from "graphai";
import { streamAgentFilterGenerator } from "@graphai/agent_filters";

export const useStreamData = () => {
  const [streamData, setStreamData] = useState<Record<string, string>>({});
  const [isStreaming, setIsStreaming] = useState<Record<string, boolean>>({});

  const outSideFunction = useCallback((context: AgentFunctionContext, token: string) => {
    const { nodeId } = context.debugInfo;
    setStreamData((prev) => ({
      ...prev,
      [nodeId]: (prev[nodeId] || "") + token,
    }));
  }, []);

  const resetStreamData = useCallback((nodeId: string) => {
    setStreamData((prev) => ({
      ...prev,
      [nodeId]: "",
    }));
  }, []);

  const streamAgentFilter = streamAgentFilterGenerator<string>(outSideFunction);

  const streamPlugin = useCallback(
    (targetNodeId: string[]) => {
      return (log: TransactionLog) => {
        const { nodeId, state } = log;
        if (targetNodeId.includes(nodeId)) {
          setIsStreaming((prev) => ({
            ...prev,
            [nodeId]: state === "executing",
          }));

          if (state === "queued") {
            resetStreamData(nodeId);
          }
        }
      };
    },
    [resetStreamData],
  );

  return {
    streamData,
    streamAgentFilter,
    resetStreamData,
    streamPlugin,
    isStreaming,
  };
};
