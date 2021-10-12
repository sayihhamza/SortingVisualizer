import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Paramters.scss";

import { delay } from "../../../supportFiles/helper";

import shallow from "zustand/shallow";
import { useControls, useData } from "../../../supportFiles/store";
import {
  convertInputToArrayString,
  convertArrayStringToArray,
  getRandomArray,
} from "../../../supportFiles/helper";

import { VscDebugStart } from "react-icons/vsc";
import { VscDebugRestart } from "react-icons/vsc";
import { ImPause } from "react-icons/im";

// const startElement = <VscDebugStart />;
// const pauseElement = <ImPause />;
// const resetElement = <VscDebugRestart />;
// const disabledPauseElement = <ImPause style={{ color: "#e5e5e5" }} />;

const Paramters = () => {
  window.addEventListener("resize", () => {
    console.log("width : " + window.innerWidth);
    console.log("height : " + window.innerHeight);
  });
  const [isPausing, setIsPausing] = useState(false);
  const [progress, speed] = useControls(
    (state:any) => [state.progress, state.speed],
    shallow
  );

  const [sortingArray, setSortingArray] = useData(
    (state:any) => [state.sortingArray, state.setSortingArray],
    shallow
  );

  const [startSorting, pauseSorting, resetSorting, setSpeed] = useControls(
    (state:any) => [
      state.startSorting,
      state.pauseSorting,
      state.resetSorting,
      state.setSpeed,
    ],
    shallow
  );

  const [arrayInput, setArrayInput] = useState(sortingArray);

  const startElement = (
    <VscDebugStart
      onClick={startSorting}
      className="icns"
      style={{
        height: "6vh",
        width: "6vw",
        left: "0",
        order: 0,
        paddingTop: "0.3em",
      }}
    />
  );
  const pauseElement = (
    <ImPause
      onClick={pauseAndDelaySorting}
      className="icns"
      style={{
        height: "6vh",
        width: "6vw",
        left: "0",
        order: 0,
        paddingTop: "0.3em",
      }}
    />
  );
  const resetElement = (
    <VscDebugRestart
      onClick={resetSorting}
      className="icns"
      style={{
        height: "6vh",
        width: "6vw",
        left: "0",
        order: 0,
        paddingTop: "0.3em",
      }}
    />
  );
  const disabledPauseElement = (
    <ImPause
      className="icns"
      style={{
        color: "rgb(100, 100, 100)",
        height: "6vh",
        width: "6vw",
        left: "0",
        order: 0,
        paddingTop: "0.3em",
      }}
    />
  );

  async function pauseAndDelaySorting() {
    pauseSorting();
    setIsPausing(true);
    await delay(useControls.getState().swapTime);
    setIsPausing(false);
  }

  function arrayDataChangeHandler(value:any) {
    const arrayString = convertInputToArrayString(value);
    setArrayInput(arrayString);

    const array = convertArrayStringToArray(arrayString);
    setSortingArray(array);
    resetSorting();
  }

  function generate() {
    const randomArray = getRandomArray();
    setArrayInput(randomArray);
    setSortingArray(randomArray);
    resetSorting();
  }

  function getProgressButton() {
    if (isPausing) return disabledPauseElement;

    switch (progress) {
      case "reset":
        return startElement;
      case "start":
        return pauseElement;
      case "pause":
        return startElement;
      case "done":
        return disabledPauseElement;
      default:
        return "";
    }
  }
  return (
    <div id="Parent">
      <div id="Element1" style={{ display: "flex" }}>
        {getProgressButton()}
        {resetElement}
        <Slider
          key={`slider-${speed}`}
          defaultValue={speed}
          onChange={(event, value) => setSpeed(value)}
          id="Slider"
          aria-labelledby="discrete-slider"
          step={1}
          marks
          min={1}
          max={10}
          style={{
            order: 2,
            width: "70%",
            alignSelf: "center",
            marginLeft: "0.5em",
            paddingTop: "0.8em",
            color: "rgb(24, 24, 24)",
          }}
        ></Slider>
      </div>
      <div id="Element2" style={{ display: "flex" }}>
        <Button
          id="Generate"
          variant="contained"
          color="primary"
          onClick={generate}
          style={{
            order:3,
            marginLeft: "2em",
            height: "3em",
            backgroundColor: "rgb(24, 24, 24)",
          }}
        >
          Generate
        </Button>
        <TextField
          id="outlined-basic"
          onChange={(event) => arrayDataChangeHandler(event.target.value)}
          value={arrayInput}
          label="Input"
          variant="outlined"
          size="small"
          style={{ margin: "0 10px", order: 4, width: "70%" }}
        ></TextField>
      </div>
    </div>
  );
};

export default Paramters;
