import { GraphData } from "graphai";

export const graphData: GraphData = {
  version: 0.5,
  nodes: {
    tools: {
      value: [
        {
          type: "function",
          function: {
            name: "report",
            description: "Report the information acquired from the user",
            parameters: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "the name of the patient (first and last)",
                },
                sex: {
                  type: "string",
                  description: "Gender of the patient.",
                  enum: ["male", "female"],
                },
                dob: {
                  type: "string",
                  description: "Patient's date of birth.",
                },
              },
              required: ["name", "sex", "dob"],
            },
          },
        },
      ],
    },
    continue: {
      value: false,
      update: ":llm.text",
    },
    messages: {
      value: [
        {
          role: "system",
          content:
            "You are responsible in retrieving following information from the user.\\nname: both first and last name\\ndob: date of birth. It MUST include the year\\nsex: gender (NEVER guess from the name)\\nWhen you get all the information from the user, call the function 'report'.\\n",
        },
      ],
      update: ":reducer.array",
    },
    userInput: {
      agent: "eventAgent",
      params: {
        isResult: true,
      },
      inputs: {},
      isResult: true,
    },
    llm: {
      agent: "openAIAgent",
      params: {
        stream: true,
        isResult: true,
        temperature: 0.7,
      },
      inputs: {
        prompt: ":userInput.text",
        messages: ":messages",
        tools: ":tools",
      },
      isResult: true,
    },
    reducer: {
      agent: "pushAgent",
      params: {},
      inputs: {
        array: ":llm.messages",
        item: ":userInput.message",
      },
      isResult: false,
    },
    result: {
      agent: "copyAgent",
      params: {
        isResult: true,
      },
      inputs: {
        message: ":llm.tool",
      },
      isResult: true,
    },
  },
  loop: {
    while: ":continue",
  },
  metadata: {
    data: {
      nodes: [
        {
          data: {
            value: [
              {
                type: "function",
                function: {
                  name: "report",
                  description: "Report the information acquired from the user",
                  parameters: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "the name of the patient (first and last)",
                      },
                      sex: {
                        type: "string",
                        description: "Gender of the patient.",
                        enum: ["male", "female"],
                      },
                      dob: {
                        type: "string",
                        description: "Patient's date of birth.",
                      },
                    },
                    required: ["name", "sex", "dob"],
                  },
                },
              },
            ],
            staticNodeType: "data",
          },
          nodeId: "tools",
          type: "static",
          position: {
            x: 238.73567456285662,
            y: 409.51754103267774,
            width: 143.99310302734375,
            height: 248.28997802734375,
            inputCenters: [55.954874992370605],
            outputCenters: [35.97223949432373],
          },
        },
        {
          data: {
            value: false,
            staticNodeType: "boolean",
          },
          nodeId: "continue",
          type: "static",
          position: {
            x: 186.80419346921485,
            y: 13.322462747730867,
            width: 143.99305725097656,
            height: 160.99827575683594,
            inputCenters: [55.95485591888428],
            outputCenters: [35.97221851348877],
          },
        },
        {
          data: {
            value: [
              {
                role: "system",
                content:
                  "You are responsible in retrieving following information from the user.\\nname: both first and last name\\ndob: date of birth. It MUST include the year\\nsex: gender (NEVER guess from the name)\\nWhen you get all the information from the user, call the function 'report'.\\n",
              },
            ],
            staticNodeType: "data",
          },
          nodeId: "messages",
          type: "static",
          position: {
            x: 18.996999938327804,
            y: 247.13867814534876,
            width: 143.9930572509765,
            height: 248.2899475097656,
            inputCenters: [55.954874992370605],
            outputCenters: [35.972208976745605],
          },
        },
        {
          data: {
            agent: "eventAgent",
            guiAgentId: "eventAgent",
            params: {
              isResult: true,
            },
          },
          nodeId: "userInput",
          type: "computed",
          position: {
            x: 11.700501271618577,
            y: 549.4736406978175,
            width: 143.9930725097656,
            height: 167.890640258789,
            inputCenters: [91.92710399627686],
            outputCenters: [55.954874992370605, 71.9444990158081],
          },
        },
        {
          data: {
            agent: "openAIAgent",
            guiAgentId: "openAIAgent",
            params: {
              stream: true,
              isResult: true,
              temperature: 0.7,
            },
          },
          nodeId: "llm",
          type: "computed",
          position: {
            x: 440.69072949443614,
            y: 94.40726415145468,
            width: 143.9930572509765,
            height: 648.550354003906,
            inputCenters: [139.8958387374878, 155.88542556762695, 171.87501049041748, 187.86460399627686],
            outputCenters: [55.95485973358154, 71.94445323944092, 87.93403148651123, 103.92360973358154, 119.91320323944092],
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
            x: 717.9976135822037,
            y: 81.51537355183245,
            width: 143.99305725097656,
            height: 135.89410400390625,
            inputCenters: [75.93750286102295, 91.92708110809326, 107.91667461395264],
            outputCenters: [55.954867362976074],
          },
        },
        {
          data: {
            agent: "copyAgent",
            guiAgentId: "toolsResultAgent",
            params: {
              isResult: true,
            },
          },
          nodeId: "result",
          type: "computed",
          position: {
            x: 684.5475914782977,
            y: 308.9445654183587,
            width: 143.99305725097656,
            height: 151.9010467529297,
            inputCenters: [75.93747997283936],
            outputCenters: [55.95484447479248],
          },
        },
      ],
      edges: [
        {
          type: "edge",
          source: {
            nodeId: "userInput",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 1,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "messages",
            index: 0,
          },
          target: {
            nodeId: "llm",
            index: 0,
            direction: "outbound",
          },
        },
        {
          type: "edge",
          source: {
            nodeId: "tools",
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
            index: 1,
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
            nodeId: "userInput",
            index: 1,
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
            nodeId: "llm",
            index: 2,
          },
          target: {
            nodeId: "continue",
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
            nodeId: "messages",
            index: 0,
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
      ],
      loop: {
        loopType: "while",
        while: ":continue",
      },
    },
  },
};
