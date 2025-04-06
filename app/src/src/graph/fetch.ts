import { GraphDataMetaData } from "../utils/gui/type";
import { GraphData } from "graphai";

export const graphData: GraphData & GraphDataMetaData = {
  nodes: {},
  metadata: {
    data: {
      nodes: [
        {
          data: {
            agent: "vanillaFetchAgent",
            guiAgentId: "fetchAgent",
            params: {
              isResult: true,
              url: "https://httpbin.org/post",
              method: "POST",
              body: '{"hello": "test"}',
              flatResponse: false,
            },
          },
          nodeId: "fetch",
          type: "computed",
          position: {
            x: 80.66241535635419,
            y: 129.51039307068277,
            width: 143.99,
            height: 632.58,
            inputCenters: [75.94, 91.93, 107.92],
            outputCenters: [55.95],
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
          nodeId: "bot",
          type: "computed",
          position: {
            x: 304.0647193322101,
            y: 143.2486282292188,
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
            nodeId: "fetch",
            index: 0,
          },
          target: {
            nodeId: "bot",
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
