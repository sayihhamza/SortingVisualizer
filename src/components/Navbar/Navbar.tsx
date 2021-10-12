import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav id="TopNav" style={{
    top: "0",
    left: "0",
    right: "0",
    position: "absolute",
    display: "flex",
    width: "100vw",
  }}>
      <a href="https://sayihhamza.github.io/SortingVisualizer/" id="Sorting">
        SortingVisualizer
      </a>
      <div id="empty"></div>
      <a
        href="https://github.com/sayihhamza/SortingVisualizer"
        target="_blank"
        id="Github"
        rel="noreferrer"
      >
        GithubRepository
      </a>
    </nav>
  );
};

export default Navbar;
