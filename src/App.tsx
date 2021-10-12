import React from "react";
import Welcome from "./components/Welcome/Welcome";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Visualizer from "./components/Visualizer/Visualizer";
import "./App.scss";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Visualizer />
      <Welcome />
      <Footer />
    </React.Fragment>
  );
}
