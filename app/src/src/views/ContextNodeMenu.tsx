import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import { useLocalStore } from "../store/index";

import ContextMenu from "./ContextMenu";

const EdgeContextMenu = forwardRef((__, ref) => {
  const contextMenuRef = useRef<{ openMenu: (event: MouseEvent | TouchEvent, rect: DOMRect) => void; closeMenu: () => void } | null>(null);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const deleteNode = useLocalStore((state) => state.deleteNode);

  useImperativeHandle(ref, () => ({
    openMenu: (event: MouseEvent | TouchEvent, rect: DOMRect, nodeIndex: number) => {
      event.preventDefault();
      contextMenuRef.current?.openMenu(event, rect);
      setSelectedNodeIndex(nodeIndex);
    },
    closeMenu: () => {
      contextMenuRef.current?.closeMenu();
    },
  }));

  return (
    <ContextMenu ref={contextMenuRef}>
      <li className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={() => deleteNode(selectedNodeIndex)}>
        Delete
      </li>
    </ContextMenu>
  );
});

export default EdgeContextMenu;
