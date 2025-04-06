import { create } from "zustand";
import {
  GUINodeData,
  GUIEdgeData,
  GUINodeDataRecord,
  UpdateStaticValue,
  UpdateAgentValue,
  UpdateNodePositionData,
  HistoryData,
  HistoryPayload,
  GUILoopData,
  NestedGraphList,
} from "../utils/gui/type";
import { store2graphData } from "../utils/gui/graph";

export interface LocalState {
  histories: HistoryData[];
  currentData: HistoryPayload;
  index: number;

  // react
  updateData: (nodeData: GUINodeData[], edgeData: GUIEdgeData[], loopData: GUILoopData, name: string, saveHistory: boolean) => void;

  // methods
  initData: (nodeData: GUINodeData[], edgeData: GUIEdgeData[], loopData: GUILoopData) => void;
  pushNode: (nodeData: GUINodeData) => void;
  pushEdge: (edgeData: GUIEdgeData) => void;
  deleteEdge: (edgeIndex: number) => void;
  deleteNode: (nodeIndex: number) => void;

  updateNodePosition: (positionIndex: number, pos: UpdateNodePositionData) => void;
  updateNodeParam: (positionIndex: number, key: string, value: unknown) => void;
  pushDataToHistory: (name: string, data: HistoryPayload) => void;
  saveNodePositionData: () => void;

  loadData: (data: HistoryPayload) => void;

  updateStaticNodeValue: (nodeIndex: number, value: UpdateStaticValue | UpdateAgentValue, saveHistory: boolean) => void;
  updateLoop: (loopData: GUILoopData) => void;

  undo: () => void;
  redo: () => void;

  reset: () => void;

  // computed
  nodes: () => GUINodeData[];
  edges: () => GUIEdgeData[];
  loop: () => GUILoopData;
  // nodeRecords,
  streamNodes: () => string[];
  resultNodes: () => string[];

  undoable: () => boolean;
  redoable: () => boolean;
}

export const useLocalStore = create<LocalState>((set, get) => ({
  histories: [],
  currentData: {
    nodes: [],
    edges: [],
    loop: { loopType: "none" },
  },
  index: 0,

  nodes: () => {
    return get().currentData.nodes;
  },

  edges: () => {
    return get().currentData.edges;
  },

  loop: () => {
    return get().currentData.loop;
  },

  streamNodes: () => {
    const nodes = get().currentData.nodes;
    return nodes
      .filter((node) => {
        return node.data?.params?.stream ?? false;
      })
      .map((node) => node.nodeId);
  },

  resultNodes: () => {
    const nodes = get().currentData.nodes;
    return nodes
      .filter((node) => {
        return node.data?.params?.isResult ?? false;
      })
      .map((node) => node.nodeId);
  },

  reset: () => {
    const { updateData } = get();
    updateData([], [], { loopType: "none" }, "reset", true);
  },

  loadData: (data: HistoryPayload) => {
    set((state) => {
      state.pushDataToHistory("load", data);
      return { currentData: data };
    });
  },

  initData: (nodeData: GUINodeData[], edgeData: GUIEdgeData[], loopData: GUILoopData) =>
    set(() => ({
      currentData: { nodes: nodeData, edges: edgeData, loop: loopData },
    })),

  pushNode: (nodeData: GUINodeData) => {
    const { updateData, currentData } = get();
    updateData([...currentData.nodes, nodeData], [...currentData.edges], { ...currentData.loop }, "addNode", true);
  },

  updateNodePosition: (positionIndex: number, pos: UpdateNodePositionData) => {
    set((state) => {
      const newNodes = [...state.currentData.nodes];

      newNodes[positionIndex] = {
        ...newNodes[positionIndex],
        position: { ...newNodes[positionIndex].position, ...pos },
      };

      return { currentData: { ...state.currentData, nodes: newNodes } };
    });
  },

  updateNodeParam: (positionIndex: number, key: string, value: unknown) => {
    const { updateData, currentData } = get();
    const oldNode = currentData.nodes[positionIndex];
    const newNode = {
      ...oldNode,
      data: {
        ...oldNode.data,
        params: oldNode.data.params ? { ...oldNode.data.params } : {},
      },
    };

    if (value === "" || value === undefined || (value === null && newNode.data.params && newNode.data.params[key] !== undefined)) {
      // delete operation
      const { [key]: __, ...updatedParams } = newNode.data.params || {};
      newNode.data.params = updatedParams;
    } else {
      // upsert
      newNode.data.params = { ...(newNode.data.params || {}), [key]: value };
    }
    const newNodes = [...currentData.nodes];
    newNodes[positionIndex] = newNode;
    updateData(newNodes, [...currentData.edges], { ...currentData.loop }, "updateParams", true);
  },

  updateStaticNodeValue: (nodeIndex: number, value: UpdateStaticValue | UpdateAgentValue, saveHistory: boolean) => {
    const { updateData, currentData } = get();
    const newNode = { ...currentData.nodes[nodeIndex] };
    newNode.data = { ...newNode.data, ...value };
    const newNodes = [...currentData.nodes];
    newNodes[nodeIndex] = newNode;
    updateData(newNodes, [...currentData.edges], { ...currentData.loop }, "updateStaticValue", saveHistory);
  },

  updateData: (nodeData: GUINodeData[], edgeData: GUIEdgeData[], loopData: GUILoopData, name: string, saveHistory: boolean) =>
    set((state) => {
      const newData = {
        nodes: nodeData,
        edges: edgeData,
        loop: loopData,
      };

      if (saveHistory) {
        state.pushDataToHistory(name, newData);
      }

      return { currentData: newData };
    }),

  pushDataToHistory: (name: string, data: HistoryPayload) =>
    set((state) => {
      const newHistories = [...state.histories.slice(0, state.index), { data, name }];
      return {
        histories: newHistories,
        index: state.index + 1,
      };
    }),

  saveNodePositionData: () =>
    set((state) => {
      state.pushDataToHistory("position", state.currentData);
      return {};
    }),

  updateLoop: (loopData: GUILoopData) => {
    const { currentData, updateData } = get();
    updateData([...currentData.nodes], [...currentData.edges], { ...loopData }, "loopUpdate", true);
  },

  pushEdge: (edgeData: GUIEdgeData) => {
    const { currentData, updateData } = get();
    updateData([...currentData.nodes], [...currentData.edges, edgeData], { ...currentData.loop }, "addEdge", true);
  },
  deleteEdge: (edgeIndex: number) => {
    const { currentData, updateData } = get();
    updateData([...currentData.nodes], [...currentData.edges.filter((__, idx) => idx !== edgeIndex)], { ...currentData.loop }, "deleteEdge", true);
  },
  deleteNode: (nodeIndex: number) => {
    const { currentData, updateData } = get();
    const node = currentData.nodes[nodeIndex];
    updateData(
      [...currentData.nodes.filter((__, idx) => idx !== nodeIndex)],
      [
        ...currentData.edges.filter((edge) => {
          const { source, target } = edge;
          return source.nodeId !== node.nodeId && target.nodeId !== node.nodeId;
        }),
      ],
      { ...currentData.loop },
      "deleteNode",
      true,
    );
  },

  // history api
  undoable: () => {
    return get().index > 1;
  },

  undo: () => {
    const { index, histories } = get();
    if (get().index > 1) {
      set(() => ({
        currentData: histories[index - 2].data,
        index: index - 1,
      }));
    }
  },
  redoable: () => {
    const { index, histories } = get();
    return index < histories.length;
  },

  redo: () => {
    const { index, histories } = get();
    if (index < histories.length) {
      set(() => ({
        currentData: histories[index].data,
        index: index + 1,
      }));
    }
  },
}));

export const node2Record = (nodes: GUINodeData[]): GUINodeDataRecord => {
  return nodes.reduce((tmp: GUINodeDataRecord, current) => {
    tmp[current.nodeId] = current;
    return tmp;
  }, {});
};

export const toGraph = (currentData: HistoryPayload) => {
  const nestedGraphs: NestedGraphList = []; // TODO: for nested graph
  return store2graphData(currentData, nestedGraphs);
};
