import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { myStore } from "./MyRedux/MyRedux";

import { MyProvider } from "./MyReactRedux/MyReactRedux";
import {Route, Router, Switch} from "react-router-dom";
import EventApp from "./components/EventApp/EventApp";
import UpComingEvent from "./components/UpComingEvents/UpComingEvents";
import Counter from "./components/Counter/Counter";
import CounterFn from "./components/Counter/CounterFn";
import { createBrowserHistory } from "history";

ReactDOM.render(
    <MyProvider store={myStore}>
              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
    <App />
  </MyProvider>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
