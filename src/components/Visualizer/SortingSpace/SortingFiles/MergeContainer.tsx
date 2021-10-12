import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  comparisionColor,
  swapColor,
  sortedColor,
} from "../../../../supportFiles/config";
import {
  ArrayHolder,
  ArrayItem,
  swapAnimation,
  moveAnimation,
} from "../../../../supportFiles/styles";
import { useControls } from "../../../../supportFiles/store";

let swapTime = useControls.getState().swapTime;
useControls.subscribe(
  (time:any) => (swapTime = time),
  (state:any) => state.swapTime
);

const AnimatedItem:any = styled(ArrayItem)`
  animation: ${(props:any) => swapAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

const MoveItem:any = styled(ArrayItem)`
  animation: ${moveAnimation()} ${() => swapTime / 1000}s forwards;
`;

const generateItems:any = (setItems:any, source:any, destination:any) => {
  setItems((items:any) => {
    const newItems = [...items];

    const temp = newItems[source];
    for (let i = source; i > destination; i--) {
      newItems[i] = newItems[i - 1];
    }

    newItems[destination] = temp;
    return newItems;
  });
};

export function MergeContainer({
  array,
  source,
  destination,
  hightlightedIndices,
  sortedIndices,
}:any) {
  const [items, setItems] = useState([...array]);

  useEffect(() => {
    if (source !== -1 && destination !== -1) {
      generateItems(setItems, source, destination);
    }
  }, [source, destination]);

  useEffect(() => {
    setItems([...array]);
  }, [array]);

  function getBackgroundColor(i:any) {
    if (sortedIndices.includes(i)) {
      return sortedColor;
    }

    if (hightlightedIndices.includes(i)) {
      return comparisionColor;
    }

    return "";
  }

  return (
    <>
      <ArrayHolder>
        {items.map((value:any, i:any) => {
          if (i === destination) {
            return (
              <AnimatedItem
                key={i + ":" + value}
                style={{
                  order: source + 1,
                  backgroundColor: getBackgroundColor(i),
                  borderRadius: "2px",
                  fontSize: "1.5em",
                  height: "10vh",
                }}
                distance={source - destination}
              >
                <strong>{value}</strong>
              </AnimatedItem>
            );
          } else if (i > destination && i <= source) {
            return (
              <MoveItem
                key={i + ":" + value}
                style={{
                  order: i,
                  backgroundColor: getBackgroundColor(i),
                  transform: "translate(50px)",
                  fontSize: "1.5em",
                  height: "10vh",
                }}
              >
                <strong>{value}</strong>
              </MoveItem>
            );
          } else {
            return (
              <ArrayItem
                key={i + ":" + value}
                style={{
                  order: i,
                  backgroundColor: getBackgroundColor(i),
                  fontSize: "1.5em",
                  height: "10vh",
                }}
              >
                <strong>{value}</strong>
              </ArrayItem>
            );
          }
        })}
      </ArrayHolder>
    </>
  );
}
