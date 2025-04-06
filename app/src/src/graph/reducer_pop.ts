import { GraphData } from "graphai";
export const graphData: GraphData = {
  version: 0.5,
  nodes: {
    source: {
      value: ["orange", "banana", "lemon"],
      update: ":popper.array",
    },
    result: {
      value: [],
      update: ":reducer.array",
    },
    popper: {
      agent: "popAgent",
      params: {},
      inputs: {
        array: ":source",
      },
      isResult: false,
    },
    reducer: {
      agent: "pushAgent",
      params: {},
      inputs: {
        array: ":result",
        item: ":popper.item",
      },
      isResult: false,
    },
    toBot: {
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
    while: ":source",
  },
  metadata: {
    data: {
      nodes: [
        {
          data: {
            value: ["orange", "banana", "lemon"],
            staticNodeType: "data",
          },
          nodeId: "source",
          type: "static",
          position: {
            x: 157.8440372800776,
            y: 70.06410869868327,
            width: 143.99305725097656,
            height: 248.28993225097656,
            inputCenters: [55.95485973358154],
            outputCenters: [35.97222423553467],
          },
        },
        {
          data: {
            value: [],
            staticNodeType: "data",
          },
          nodeId: "result",
          type: "static",
          position: {
            x: 162.64812355594705,
            y: 355.2553070418687,
            width: 143.99305725097656,
            height: 248.28990173339844,
            inputCenters: [55.95485973358154],
            outputCenters: [35.97222423553467],
          },
        },
        {
          data: {
            agent: "popAgent",
            guiAgentId: "popAgent",
            params: {},
          },
          nodeId: "popper",
          type: "computed",
          position: {
            x: 375.37133610190364,
            y: 196.01576295393056,
            width: 143.99305725097656,
            height: 119.9045181274414,
            inputCenters: [91.92709046602249],
            outputCenters: [55.954867362976074, 71.94445133209229],
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
            x: 389.49609096034095,
            y: 381.7984732734747,
            width: 143.99305725097656,
            height: 135.89410400390625,
            inputCenters: [75.93750286102295, 91.92708110809326, 107.91667461395264],
            outputCenters: [55.954867362976074],
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
          nodeId: "toBot",
          type: "computed",
          position: {
            x: 579.0413888286738,
            y: 419.175072057377,
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
            nodeId: "popper",
            index: 1,
          },
          target: {
            nodeId: "source",
            index: 0,
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
            nodeId: "result",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "source",
            index: 0,
          },
          target: {
            nodeId: "popper",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "result",
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
            nodeId: "popper",
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
            nodeId: "toBot",
            index: 0,
            direction: "outbound",
          },
        },
      ],
      loop: {
        loopType: "while",
        while: ":source",
      },
    },
  },
};
