import { useRef, useState, useMemo, useCallback } from "react";
import { useLocalStore, node2Record } from "../store/index";
import type { Position, NewEdgeStartEventData, NewEdgeData, ClosestNodeData, GUINearestData, NestedGraphList } from "../utils/gui/type";
import { edgeStartEventData, edgeUpdateEventData, edgeEndEventData, pickNearestNode, pickNearestConnect, isEdgeConnectale } from "../utils/gui/utils";

export const useNewEdge = () => {
  const nodes = useLocalStore((state) => state.nodes());
  const edges = useLocalStore((state) => state.edges());
  const nodeRecords = useMemo(() => node2Record(nodes), [nodes]);
  const pushEdge = useLocalStore((state) => state.pushEdge);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [newEdgeData, setNewEdgeData] = useState<NewEdgeData | null>(null);
  const [mouseCurrentPosition, setMouseCurrentPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [targetNode, setTargetNode] = useState<string>("");

  const onNewEdgeStart = useCallback(
    (data: NewEdgeStartEventData) => {
      if (svgRef.current) {
        setTargetNode(data.nodeId);
        const { mousePosition, startEdgeData } = edgeStartEventData(data, svgRef.current, nodeRecords[data.nodeId]);
        setMouseCurrentPosition(mousePosition);
        setNewEdgeData(startEdgeData);
      }
    },
    [nodeRecords],
  );

  const onNewEdge = useCallback(
    (data: Position) => {
      if (newEdgeData && svgRef.current) {
        const { mousePosition, updateEdgeData } = edgeUpdateEventData(data, svgRef.current, newEdgeData);
        setMouseCurrentPosition(mousePosition);
        setNewEdgeData(updateEdgeData);
      }
    },
    [newEdgeData],
  );

  const nearestNode = useMemo<ClosestNodeData | null>(() => {
    if (!nodes.length) return null;
    return pickNearestNode(nodes, targetNode, mouseCurrentPosition);
  }, [nodes, targetNode, mouseCurrentPosition]);

  const nearestConnect = useMemo(() => {
    if (!newEdgeData || !nearestNode) return;
    return pickNearestConnect(nearestNode, newEdgeData, mouseCurrentPosition);
  }, [newEdgeData, nearestNode, mouseCurrentPosition]);

  const nearestData = useMemo<GUINearestData | undefined>(() => {
    if (!nearestNode || !nearestConnect || !newEdgeData) return;
    return {
      nodeId: nearestNode.node.nodeId,
      index: nearestConnect.index,
      direction: newEdgeData.direction,
    };
  }, [nearestNode, nearestConnect, newEdgeData]);

  const expectEdge = useMemo(() => {
    if (!nearestData || !newEdgeData) return null;
    return edgeEndEventData(newEdgeData, nearestData);
  }, [nearestData, newEdgeData]);

  const edgeConnectable = useMemo(() => {
    const nestedGraphs: NestedGraphList = []; // TODO: for nested graph
    return isEdgeConnectale(expectEdge, edges, nodeRecords, nestedGraphs);
  }, [expectEdge, edges, nodeRecords]);

  const onNewEdgeEnd = useCallback(() => {
    if (expectEdge && edgeConnectable) {
      pushEdge(expectEdge);
    }
    setNewEdgeData(null);
  }, [expectEdge, edgeConnectable, pushEdge]);

  return {
    svgRef,
    newEdgeData,
    onNewEdgeStart,
    onNewEdge,
    onNewEdgeEnd,
    nearestData,
    expectEdge,
    edgeConnectable,
  };
};
