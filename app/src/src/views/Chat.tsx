import React from "react";
import { GUIMessage } from "../utils/gui/type";

interface ChatProps {
  messages: GUIMessage[];
  isStreaming: Record<string, boolean>;
  streamData: Record<string, string>;
  streamNodeIds: string[];
}

const Chat: React.FC<ChatProps> = ({ messages, isStreaming, streamData, streamNodeIds }) => {
  return (
    <div className="m-auto w-10/12 text-left">
      {messages.map((m, k) => (
        <div key={k}>
          {m.role === "user" ? (
            <div className="mr-8">👱{m.content}</div>
          ) : (
            <div className="ml-20">
              🤖({m.nodeId}){m.content}
            </div>
          )}
        </div>
      ))}
      {streamNodeIds.map((nodeId, k) => (
        <div key={k}>
          {isStreaming[nodeId] && (
            <div className="ml-20">
              🤖({nodeId}){streamData[nodeId]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chat;
