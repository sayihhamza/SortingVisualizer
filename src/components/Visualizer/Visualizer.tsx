import React, { useState, useEffect } from "react";
import AlgoNavbar from "./AlgoNavbar/AlgoNavbar";
import Paramters from "./Paramters/Paramters";
import { SortingSpace } from "./SortingSpace/SortingSpace";
import "./Visualizer.scss";
const delay = 3.3;
export default function Visualizer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
  const VisualizerStyles:any = {
    position: "static",
    display: "flex",
    flexDirection: "column",
    height: "86vh",
  };
  const ParamtersStyles:any = {
    display: "inline-flex",
    order: "1",
    width: "100vw",
    marginTop: "clamp(3.9rem, 5vw, 4.2rem)",
    textAlign: "center",
  };
  const SortingSpaceStyles:any = {
    order: "2",
    width: "100vw",
    height: "80vh",
    position: "relative",
    overflowX: "hidden",
  };
  return show ? (
    <React.Fragment>
      <div id="Visualizer" style={VisualizerStyles}>
        <AlgoNavbar />
        <div style={ParamtersStyles}>
          <Paramters />
        </div>
        <div style={SortingSpaceStyles}>
          <SortingSpace />
        </div>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment></React.Fragment>
  );
}
