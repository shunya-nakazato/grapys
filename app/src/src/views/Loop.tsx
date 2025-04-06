import { useEffect, useRef } from "react";
import { useLocalStore } from "../store";

import { getLoopWhileSources } from "../utils/gui/utils";
import { LoopDataType, NestedGraphList } from "../utils/gui/type";

const LoopComponent = () => {
  const nodes = useLocalStore((state) => state.nodes());
  const loop = useLocalStore((state) => state.loop());
  const storeUpdateLoop = useLocalStore((state) => state.updateLoop);
  const countRef = useRef<HTMLInputElement | null>(null);

  const nestedGraphs: NestedGraphList = []; // TODO: for nested graph
  const whileSources = getLoopWhileSources(nodes, nestedGraphs);

  const updateLoop = () => {
    if (loop.loopType === "while") {
      storeUpdateLoop({ loopType: "while", while: loop.while });
    } else if (loop.loopType === "count") {
      storeUpdateLoop({ loopType: "count", count: Number(loop.count) });
    } else {
      storeUpdateLoop({ loopType: "none" });
    }
  };

  useEffect(() => {
    const handleBlur = () => updateLoop();
    if (countRef.current) {
      countRef.current.addEventListener("blur", handleBlur);
    }
    return () => {
      if (countRef.current) {
        countRef.current.removeEventListener("blur", handleBlur);
      }
    };
  }, [countRef]);

  return (
    <div className="absolute flex w-36 cursor-grab flex-col rounded-md bg-green-400 text-center text-white select-none">
      <div className="w-full rounded-t-md bg-green-500 py-1 text-center leading-none">Loop</div>
      <div className="my-4 p-2">
        <select
          className="w-full resize-none rounded-md border border-gray-300 p-1 text-black"
          onChange={(e) => storeUpdateLoop({ ...loop, loopType: e.target.value as LoopDataType })}
          value={loop.loopType}
        >
          <option value="none">None</option>
          <option value="while">While</option>
          <option value="count">Count</option>
        </select>

        {loop.loopType === "while" && (
          <div className="mt-2">
            <select
              className="w-full resize-none rounded-md border border-gray-300 p-1 text-black"
              onChange={(e) => storeUpdateLoop({ ...loop, while: e.target.value === "true" ? true : e.target.value })}
              value={(loop.while === true ? "true" : loop.while) || whileSources[0]}
            >
              {whileSources.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}

        {loop.loopType === "count" && (
          <div className="mt-2">
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 p-1 text-black"
              ref={countRef}
              value={loop.count || "1"}
              onChange={(e) => storeUpdateLoop({ ...loop, count: Number(e.target.value) })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoopComponent;
