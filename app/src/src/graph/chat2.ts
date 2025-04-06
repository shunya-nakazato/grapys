import { GraphData } from "graphai";
export const graphChat: GraphData = {
  metadata: {
    data: {
      nodes: [
        {
          type: "static",
          nodeId: "messages",
          position: {
            x: 27,
            y: 161,
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
            x: 220,
            y: 15,
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
            x: 222,
            y: 242,
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
        {
          type: "computed",
          nodeId: "reducer",
          position: {
            x: 630,
            y: 244,
            width: 143.99,
            height: 151.88,
            inputCenters: [75.94, 91.93, 107.92],
            outputCenters: [55.95],
          },
          data: {
            guiAgentId: "pushAgent",
          },
        },
        {
          data: {
            agent: "copyAgent",
            guiAgentId: "itemToArrayAgent",
            params: {},
          },
          nodeId: "toArray",
          type: "computed",
          position: {
            x: 428.20882624422705,
            y: 374.6261401440973,
            width: 143.99,
            height: 167.87,
            inputCenters: [75.94, 91.93, 107.92, 123.91],
            outputCenters: [55.95],
          },
        },
      ],
      edges: [
        {
          source: {
            nodeId: "reducer",
            index: 0,
          },
          target: {
            nodeId: "messages",
            index: 0,
          },
          type: "edge",
        },
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
          source: {
            nodeId: "messages",
            index: 0,
          },
          target: {
            nodeId: "reducer",
            index: 0,
          },
          type: "edge",
        },
        {
          type: "edge",
          source: {
            nodeId: "userInput",
            index: 1,
          },
          target: {
            nodeId: "toArray",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "llm",
            index: 0,
          },
          target: {
            nodeId: "toArray",
            index: 1,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "toArray",
            index: 0,
          },
          target: {
            nodeId: "reducer",
            index: 2,
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
