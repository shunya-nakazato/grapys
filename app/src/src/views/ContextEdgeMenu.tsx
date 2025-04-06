import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import ContextMenu from "./ContextMenu";
import { useLocalStore } from "../store/index";

type ContextEdgeMenuHandle = {
  openMenu: (event: MouseEvent | TouchEvent, rect: DOMRect) => void;
  closeMenu: () => void;
};

const ContextEdgeMenu = forwardRef((__, ref) => {
  const contextMenuRef = useRef<ContextEdgeMenuHandle | null>(null);
  const [selectedEdgeIndex, setSelectedEdgeIndex] = useState(0);
  const deleteEdge = useLocalStore((state) => state.deleteEdge);

  useImperativeHandle(ref, () => ({
    openMenu: (event: MouseEvent | TouchEvent, rect: DOMRect, edgeIndex: number) => {
      event.preventDefault();
      contextMenuRef.current?.openMenu(event, rect);
      setSelectedEdgeIndex(edgeIndex);
    },
    closeMenu: () => {
      contextMenuRef.current?.closeMenu();
    },
  }));

  const _deleteEdge = () => {
    deleteEdge(selectedEdgeIndex);
  };

  return (
    <ContextMenu ref={contextMenuRef}>
      <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={_deleteEdge}>
        Delete
      </li>
    </ContextMenu>
  );
});

export default ContextEdgeMenu;
