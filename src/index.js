import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const rootEl = document.createElement("div");
rootEl.id = "react-chrome-ext";
document.body.appendChild(rootEl);

ReactDOM.render(<App />, rootEl);
