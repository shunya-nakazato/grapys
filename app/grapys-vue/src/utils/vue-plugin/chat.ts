import { ref } from "vue";
import { TransactionLog, isObject } from "graphai";
import { GUIMessage } from "../gui/type";

export const useChatPlugin = () => {
  const messages = ref<GUIMessage[]>([]);
  const chatMessagePlugin = (targetNodeId: string[]) => {
    return (log: TransactionLog) => {
      const { nodeId, state, result } = log;
      if (targetNodeId.includes(nodeId) && state === "completed" && result) {
        if (isObject(result) && result.message) {
          if (isObject(result.message) && result.message.role) {
            messages.value.push({ ...(result as { message: { role: string; content: string } }).message, nodeId });
          } else if (typeof result.message === "string") {
            messages.value.push({ role: "bot", content: result.message, nodeId });
          } else {
            messages.value.push({ role: "bot", content: JSON.stringify(result.message), nodeId });
          }
        }
      }
    };
  };
  return {
    messages,
    chatMessagePlugin,
  };
};
