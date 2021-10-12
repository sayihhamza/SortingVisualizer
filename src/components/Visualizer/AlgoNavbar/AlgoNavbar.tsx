import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { sortingAlgorithms } from "../../../supportFiles/config";
import { useData } from "../../../supportFiles/store";
import shallow from "zustand/shallow";

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const NavStyles: any = {
  position: "absolute",
  width: "100vw",
  left: "0",
  right: "0",
  backgroundColor: "rgb(211, 211, 211)",
  display: "inline-flex",
  overflow: "auto",
  marginBottom: "0",
  paddingBottom: "0",
};

const AlgoNavbar = () => {
  const topNav: any = document.getElementById("TopNav");
  const [, setTop] = React.useState(topNav.offsetHeight);
  const [algorithm, setAlgorithm] = useData(
    (state: any) => [state.algorithm, state.setAlgorithm],
    shallow
  );

  window.addEventListener("resize", () => {
    setTop(topNav.offsetHeight);
  });

  return (
    <div style={{ fontFamily: " Oxygen, system-ui, sans-serif !important" }}>
      <nav id="AlgoNavbar" color="grey" style={NavStyles}>
        <AppBar position="static" color="transparent">
          <Tabs
            value={algorithm}
            onChange={(event, id) => setAlgorithm(id)}
            TabIndicatorProps={{
              style: {
                backgroundColor: "transparent",
              },
            }}
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            style={{
              backgroundColor: "rgb(211, 211, 211)",
              display: "inline-flex",
              justifyContent: "center",
              height: "3vh",
            }}
          >
            {sortingAlgorithms.map((algorithm: any) => (
              <Tab
                label={algorithm.title}
                {...a11yProps(0)}
                key={algorithm.title}
                style={{
                  flexGrow: 1,
                  fontWeight: "bold",
                  fontSize: "1.3em",
                  color: "rgb(27, 27, 27)",
                }}
              />
            ))}
            <Tab
              label="All"
              {...a11yProps(6)}
              style={{
                flexGrow: 1,
                fontWeight: "bold",
                fontSize: "1.3em",
                color: "rgb(27, 27, 27)",
              }}
            />
          </Tabs>
        </AppBar>
      </nav>
    </div>
  );
};

export default AlgoNavbar;
