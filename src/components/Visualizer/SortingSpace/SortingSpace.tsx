import React, { useEffect } from "react";
import styled from "styled-components";
import { sortingAlgorithms } from "../../../supportFiles/config";
import { useControls, useData } from "../../../supportFiles/store";
import shallow from "zustand/shallow";
import { SortManager } from "./SortingFiles/SortManager";

const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center !important;
  max-width: 100%;
  column-gap: 10px;
  row-gap: 10px;
`;

function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
      style={{ maxWidth: "100%" }}
    >
      {value === index && children}
    </div>
  );
}

export function SortingSpace() {
  const resetSorting = useControls((state:any) => state.resetSorting);

  const [sortingArray, algorithm] = useData(
    (state:any) => [state.sortingArray, state.algorithm],
    shallow
  );

  useEffect(() => {
    resetSorting();
  }, [algorithm, resetSorting]);

  if (sortingArray.length === 0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
        }}
      >
        <h2 style={{ justifyContent: "center" }}>
          1) Please use the generate button or enter your custom input.
        </h2>
        <br />
        <h2 style={{ justifyContent: "center" }}>
          2) Then select one ( or all ) of the sorting algorithms listed above.
        </h2>
        <br />
        <h2 style={{ justifyContent: "center" }}>
          3) Click the start button to begin visualizing.
        </h2>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
        width: "100vw",
      }}
    >
      <div>
        {sortingAlgorithms.map((algoInfo:any, idx:any) => (
          <TabPanel value={algorithm} index={idx} key={algoInfo.name}>
            <SortManager
              array={sortingArray}
              sortFunction={algoInfo.component}
              sortingAlgorithmName={algoInfo.name}
            />
          </TabPanel>
        ))}
        <TabPanel value={algorithm} index={sortingAlgorithms.length}>
          <FlexWrap>
            {sortingAlgorithms.map((algoInfo:any) => (
              <SortManager
                array={sortingArray}
                sortFunction={algoInfo.component}
                sortingAlgorithmName={algoInfo.name}
                key={algoInfo.name}
              />
            ))}
          </FlexWrap>
        </TabPanel>
      </div>
    </div>
  );
}
