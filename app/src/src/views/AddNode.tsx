import { useState, useEffect, useMemo } from "react";
import { useLocalStore, node2Record } from "../store";
import { agentProfiles } from "../utils/gui/data";
import { getDefaultParams } from "../utils/gui/utils";

const AddNode = () => {
  const nodesKey = Object.keys(agentProfiles);
  const [nodeId, setNodeId] = useState("");
  const [agent, setAgent] = useState(nodesKey[0] || "StaticNode");
  const [isError, setIsError] = useState(false);

  const nodes = useLocalStore((state) => state.nodes());
  const nodeRecords = useMemo(() => node2Record(nodes), [nodes]);
  const pushNode = useLocalStore((state) => state.pushNode);

  useEffect(() => {
    setIsError(false);
  }, [nodeId]);

  const addNode = () => {
    if (nodeId === "" || nodeRecords[nodeId]) {
      setIsError(true);
      return;
    }

    const isStatic = agent === "StaticNode";
    const targetAgent = agentProfiles[agent];
    const data = isStatic
      ? {}
      : {
          agent: targetAgent.agents ? targetAgent.agents[0] : targetAgent.agent,
          guiAgentId: agent,
          params: getDefaultParams(targetAgent.params ?? []),
          ...(targetAgent.agents ? { agentIndex: 0 } : {}),
        };

    pushNode({
      data,
      nodeId,
      type: isStatic ? "static" : "computed",
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    });

    setNodeId("");
  };

  return (
    <div className="text-left">
      <div>
        NodeId:
        <input
          type="text"
          value={nodeId}
          onChange={(e) => setNodeId(e.target.value)}
          className={`w-full rounded-md border-2 border-gray-300 p-1 text-black ${isError ? "border-red-600" : ""}`}
        />
      </div>
      <select className="mt-2 w-full resize-none rounded-md border-2 border-gray-300 p-1 text-black" value={agent} onChange={(e) => setAgent(e.target.value)}>
        <option>StaticNode</option>
        {nodesKey.map((agentName, index) => (
          <option key={index} value={agentName}>
            {agentName}
          </option>
        ))}
      </select>
      <div>
        <button onClick={addNode} className="m-1 cursor-pointer items-center rounded-full bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-700">
          Add node
        </button>
      </div>
    </div>
  );
};

export default AddNode;
