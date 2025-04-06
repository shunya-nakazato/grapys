import { GraphData } from "graphai";
export const graphChat: GraphData = {
  metadata: {
    data: {
      nodes: [
        {
          type: "static",
          nodeId: "messages",
          position: {
            x: 193,
            y: 83,
            width: 143.99,
            height: 264.28,
            inputCenters: [55.95],
            outputCenters: [35.97],
          },
          data: {
            value: [],
            staticNodeType: "data",
          },
        },
        {
          type: "computed",
          nodeId: "userInput",
          position: {
            x: 185,
            y: 376,
            width: 143.99,
            height: 183.88,
            inputCenters: [91.93],
            outputCenters: [55.95, 71.94],
          },
          data: {
            params: {
              message: "You:",
              isResult: true,
            },
            guiAgentId: "eventAgent",
          },
        },
        {
          type: "computed",
          nodeId: "llm",
          position: {
            x: 397,
            y: 89,
            width: 143.99,
            height: 616.55,
            inputCenters: [139.9, 155.89, 171.88, 187.86],
            outputCenters: [55.95, 71.94, 87.93, 103.92, 119.91],
          },
          data: {
            params: {
              forWeb: true,
              stream: true,
              isResult: true,
            },
            guiAgentId: "openAIAgent",
          },
        },
      ],
      edges: [
        {
          source: {
            nodeId: "messages",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 0,
          },
          type: "edge",
        },
        {
          source: {
            nodeId: "userInput",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 1,
          },
          type: "edge",
        },
        {
          type: "edge",
          source: {
            nodeId: "llm",
            index: 1,
          },
          target: {
            nodeId: "messages",
            index: 0,
            direction: "outbound",
          },
        },
      ],
      loop: {
        loopType: "while",
        while: true,
      },
    },
  },
  nodes: {},
};
