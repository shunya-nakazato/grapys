import { useState, useCallback } from "react";
import { TransactionLog, isObject } from "graphai";
import { GUIMessage } from "../gui/type";

export const useChatPlugin = () => {
  const [messages, setMessages] = useState<GUIMessage[]>([]);

  const chatMessagePlugin = useCallback((targetNodeId: string[]) => {
    return (log: TransactionLog) => {
      const { nodeId, state, result } = log;
      if (targetNodeId.includes(nodeId) && state === "completed" && result) {
        if (isObject(result) && result.message) {
          if (isObject(result.message) && result.message.role) {
            const { role, content } = (result as { message: GUIMessage }).message;
            if (isObject(content)) {
              const newMessage = { role, content: JSON.stringify(content), nodeId };
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            } else {
              const newMessage = { role, content, nodeId };
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
          } else if (typeof result.message === "string") {
            const newMessage = { role: "bot", content: result.message, nodeId };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } else {
            const newMessage = { role: "bot", content: JSON.stringify(result.message), nodeId };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      }
    };
  }, []);

  return {
    messages,
    chatMessagePlugin,
  };
};
