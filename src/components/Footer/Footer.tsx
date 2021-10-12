import React from "react";
import "./Footer.scss";
export default function Footer() {
  return (
    <footer style={ {
    bottom: "0rem",
    position: "absolute",
    display: "inline-flex",
    marginBottom: "1em",
    marginLeft: "-5em",
  }}>
      Made by&nbsp;
      <a href="https://github.com/sayihhamza" target="_blank" rel="noreferrer">
        SAYIH Hamza
      </a>
    </footer>
  );
}
