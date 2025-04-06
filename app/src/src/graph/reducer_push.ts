import { GraphData } from "graphai";
export const graphData: GraphData = {
  version: 0.5,
  nodes: {
    array: {
      value: [],
      update: ":reducer.array",
    },
    reducer: {
      agent: "pushAgent",
      params: {},
      inputs: {
        array: ":array",
        item: ":item",
      },
      isResult: false,
    },
    item: {
      value: "1",
    },
    bot: {
      agent: "copyAgent",
      params: {
        isResult: true,
      },
      inputs: {
        message: {
          role: "bot",
          content: ":reducer.array",
        },
      },
      isResult: true,
    },
  },
  loop: {
    count: 10,
  },
  metadata: {
    data: {
      nodes: [
        {
          data: {
            value: [],
            staticNodeType: "data",
          },
          nodeId: "array",
          type: "static",
          position: {
            x: 164.55474859477886,
            y: 144.44757185580787,
            width: 143.99305725097656,
            height: 248.289947509765,
            inputCenters: [55.954867362976074],
            outputCenters: [35.9722318649292],
          },
        },
        {
          data: {
            agent: "pushAgent",
            guiAgentId: "pushAgent",
            params: {},
          },
          nodeId: "reducer",
          type: "computed",
          position: {
            x: 472.26636945116286,
            y: 232.45002558442553,
            width: 143.99305725097656,
            height: 135.89410400390625,
            inputCenters: [75.93749523162842, 91.9270887374878, 107.91668224334717],
            outputCenters: [55.95485973358154],
          },
        },
        {
          data: {
            value: "1",
            staticNodeType: "text",
          },
          nodeId: "item",
          type: "static",
          position: {
            x: 299.3451848457412,
            y: 446.44823259731214,
            width: 143.99305725097656,
            height: 224.29689025878906,
            inputCenters: [55.954874992370605],
            outputCenters: [35.97223949432373],
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
            x: 632.1666943267171,
            y: 445.05464379624453,
            width: 143.99305725097656,
            height: 135.91146850585938,
            inputCenters: [59.947916984558105],
            outputCenters: [],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "reducer",
            index: 0,
          },
          target: {
            nodeId: "array",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "array",
            index: 0,
          },
          target: {
            nodeId: "reducer",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "item",
            index: 0,
          },
          target: {
            nodeId: "reducer",
            index: 1,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "reducer",
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
        loopType: "count",
        count: 10,
      },
    },
  },
};
