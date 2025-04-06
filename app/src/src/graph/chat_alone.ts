import { GraphData } from "graphai";
export const graphChat: GraphData = {
  version: 0.5,
  nodes: {
    inputNode: {
      agent: "eventAgent",
      params: {
        isResult: false,
      },
      inputs: {},
      isResult: false,
    },
    resultNode: {
      agent: "copyAgent",
      params: {
        isResult: true,
      },
      inputs: {
        message: ":inputNode.message",
      },
      isResult: true,
    },
  },
  loop: {
    while: true,
  },
  metadata: {
    data: {
      nodes: [
        {
          data: {
            agent: "eventAgent",
            guiAgentId: "eventAgent",
            params: {
              isResult: false,
            },
          },
          nodeId: "inputNode",
          type: "computed",
          position: {
            x: 177.39108727385695,
            y: 224.3380639120064,
            width: 143.99305725097656,
            height: 167.89060974121094,
            inputCenters: [91.92705821990967],
            outputCenters: [55.95482921600342, 71.9444227218628],
          },
        },
        {
          data: {
            agent: "copyAgent",
            guiAgentId: "resultAgent",
            params: {
              isResult: true,
            },
          },
          nodeId: "resultNode",
          type: "computed",
          position: {
            x: 422.13371628645217,
            y: 88.69271918239747,
            width: 143.99305725097656,
            height: 151.9010467529297,
            inputCenters: [75.93751811981201],
            outputCenters: [55.954867362976074],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "inputNode",
            index: 1,
          },
          target: {
            nodeId: "resultNode",
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
};
