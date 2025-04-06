import { GraphDataMetaData } from "../utils/gui/type";
import { GraphData } from "graphai";

export const graphData: GraphData & GraphDataMetaData = {
  nodes: {},
  metadata: {
    data: {
      nodes: [
        {
          data: {
            value: [
              {
                type: "function",
                function: {
                  name: "your_ideas",
                  description: "Your answer to a user's inquiry",
                  parameters: {
                    type: "object",
                    properties: {
                      methods: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            title: {
                              type: "string",
                              description: "title",
                            },
                            description: {
                              type: "string",
                              description: "description",
                            },
                          },
                          required: ["title", "description"],
                        },
                      },
                    },
                    required: ["methods"],
                  },
                },
              },
            ],
            staticNodeType: "data",
          },
          nodeId: "func",
          type: "static",
          position: {
            x: 46.23037205816604,
            y: 132.73764693382702,
            width: 143.99305725097656,
            height: 248.2899627685547,
            inputCenters: [55.95485973358154],
            outputCenters: [35.97222423553467],
          },
        },
        {
          data: {
            agent: "openAIAgent",
            guiAgentId: "openAIAgent",
            params: {
              stream: false,
              isResult: false,
              temperature: 0.7,
              system: "You are an expert on the global economy. Think about the user's query and return 10 this result to the functions result.",
            },
          },
          nodeId: "llm",
          type: "computed",
          position: {
            x: 276.77382000031037,
            y: 81.53593505287085,
            width: 143.9930572509765,
            height: 648.550354003906,
            inputCenters: [139.89584636688232, 155.8854398727417, 171.87500286102295, 187.86459636688232],
            outputCenters: [55.954867362976074, 71.94446086883545, 87.93403911590576, 103.92361736297607, 119.91321086883545],
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
            x: 515.0044443107122,
            y: 65.27604785998994,
            width: 143.99305725097656,
            height: 135.91146850585938,
            inputCenters: [59.947916984558105],
            outputCenters: [],
          },
        },
        {
          data: {
            value: "Please tell me how we can work together around the world to reduce CO2.",
            staticNodeType: "text",
          },
          nodeId: "prompt",
          type: "static",
          position: {
            x: 63.1408974091695,
            y: 415.62719747510084,
            width: 143.99305725097656,
            height: 224.2969207763672,
            inputCenters: [55.954874992370605],
            outputCenters: [35.97223949432373],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "func",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 3,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "llm",
            index: 3,
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
            nodeId: "prompt",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 1,
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
