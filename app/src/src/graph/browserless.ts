import { GraphDataMetaData } from "../utils/gui/type";
import { GraphData } from "graphai";

export const graphData: GraphData & GraphDataMetaData = {
  nodes: {},
  metadata: {
    data: {
      nodes: [
        {
          data: {
            agent: "browserlessAgent",
            guiAgentId: "browserlessAgent",
            params: {},
          },
          nodeId: "web",
          type: "computed",
          position: {
            x: 261.2686676974985,
            y: 92.05264271968883,
            width: 143.99,
            height: 103.91,
            inputCenters: [75.94],
            outputCenters: [55.95],
          },
        },
        {
          data: {
            value: "https://github.com/receptron/graphai-agents/blob/main/net/browserless_agent/src/browserless_agent.ts",
            staticNodeType: "text",
          },
          nodeId: "url",
          type: "static",
          position: {
            x: 59.707526532967336,
            y: 185.3588983523864,
            width: 143.99,
            height: 224.3,
            inputCenters: [55.95],
            outputCenters: [35.97],
          },
        },
        {
          data: {
            agent: "copyAgent",
            guiAgentId: "dataToChatBotAgent",
            params: {
              isResult: true,
            },
          },
          nodeId: "result",
          type: "computed",
          position: {
            x: 462.9132258974612,
            y: 63.44502534237597,
            width: 143.99,
            height: 135.91,
            inputCenters: [59.95],
            outputCenters: [],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "web",
            index: 0,
          },
          target: {
            nodeId: "result",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "url",
            index: 0,
          },
          target: {
            nodeId: "web",
            index: 0,
            direction: "outbound",
          },
        },
      ],
      loop: {
        loopType: "none",
      },
    },
  },
};
