import { GraphDataMetaData } from "../utils/gui/type";
import { GraphData } from "graphai";

export const graphData: GraphData & GraphDataMetaData = {
  nodes: {},

  metadata: {
    data: {
      nodes: [
        {
          data: {
            agent: "openAIImageAgent",
            guiAgentId: "openAIImageAgent",
            params: {
              isResult: true,
              prompt: "earth seen from the moon",
            },
          },
          nodeId: "image",
          type: "computed",
          position: {
            x: 122.549335750571,
            y: 267.14385267347234,
            width: 143.99,
            height: 559.54,
            inputCenters: [91.93, 107.92],
            outputCenters: [55.95, 71.94],
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
            x: 395.5164347794266,
            y: 416.30580457349333,
            width: 143.99,
            height: 151.9,
            inputCenters: [59.95],
            outputCenters: [],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "image",
            index: 1,
          },
          target: {
            nodeId: "result",
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
