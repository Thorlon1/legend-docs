import React, { useRef, useState } from "react";
import { Editor } from "../Editor/Editor";
import {
  Memo,
  enableLegendStateReact,
  observer,
  useObservable,
} from "@legendapp/state/react";
import { useInterval } from "usehooks-ts";
import { observable } from "@legendapp/state";
import { FlashingDiv } from "../FlashingDiv/FlashingDiv";

const MEMO_CODE = `
  const MemoExample = () => {
    const renderCount = ++useRef(0).current;
    const state$ = useObservable({ count: 0 });
    const [value, setValue] = useState(1);

    useInterval(() => {
      state$.count.set((v) => v + 1);
    }, 500);

    const onClick = () => setValue((v) => v + 1);

    return (
      <div className="p-4 text-md bg-gray-800" style={{ width: "150px" }}>
        <div>Renders: {Math.max(renderCount, 1)}</div>
        <div>Value: {value}</div>
        <button
          className="block px-4 py-2 my-8 font-bold bg-gray-700 rounded shadow text-2xs hover:bg-gray-600 active:bg-gray-500"
          onClick={onClick}
        >
          Render parent
        </button>
        <Memo>
          {() => <>
            <div>Value: {value}</div>
            <div className="pt-4">Count: {state$.count.get()}</div>
          </>}
        </Memo>
      </div>
    );
  };

  render(<MemoExample />)
`;

export function MemoExampleComponent() {
  return (
    <Editor
      code={MEMO_CODE}
      scope={{
        useRef,
        useObservable,
        Memo,
        observable,
        enableLegendStateReact,
        useInterval,
        observer,
        React,
        FlashingDiv,
        useState,
      }}
      noInline={true}
    />
  );
}
