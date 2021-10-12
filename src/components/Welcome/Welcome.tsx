import React, { useState, useEffect } from "react";
import "./Welcome.scss";

const delay = 3.1;
export default function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timer1 = setTimeout(() => setShow(true), delay * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return show ? (
    <React.Fragment></React.Fragment>
  ) : (
    <React.Fragment>
      <h1
        style={{
          fontSize: "clamp(2rem, 10vw, 8rem)",
          position: "relative",
          fontFamily: " Oxygen, system-ui, sans-serif",
          width: "max-content",
          color: "rgb(41, 41, 41)",
        }}
      >
        Welcome to <br /> SortingVisualizer
      </h1>
    </React.Fragment>
  );
}
