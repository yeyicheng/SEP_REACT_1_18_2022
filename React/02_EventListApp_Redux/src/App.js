import React, { useState } from "react";
import EventApp from "./components/EventApp/EventApp";
import UpComingEvent from "./components/UpComingEvents/UpComingEvents";
import Counter from "./components/Counter/Counter";
import CounterFn from "./components/Counter/CounterFn";

import "./App.css";

import Header from "./components/Header/Header";

const PAGESINFO = {
  EventManager: "EventManager",
  UpComingEvent: "UpComingEvent",
  CounterClass: "CounterClass",
  CounterFn: "CounterFn",
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(PAGESINFO.CounterClass);
  // eslint-disable-next-line no-unused-vars
  const [pagesInfo, setPagesInfo] = useState(PAGESINFO);

  const hanldePageChange = (newPageInfo) => {
    setCurrentPage(newPageInfo);
  };

  let curPage = null;
  switch (currentPage) {
    case PAGESINFO.EventManager:
      curPage = <EventApp></EventApp>;
      break;
    case PAGESINFO.UpComingEvent:
      curPage = <UpComingEvent></UpComingEvent>;
      break;
    case PAGESINFO.CounterClass:
      curPage = <Counter />;
      break;
    case PAGESINFO.CounterFn:
      curPage = <CounterFn />;
      break;
    default:
  }

  return (
    <div className="App">
      <Header
    pagesInfo={pagesInfo}
    hanldePageChange={hanldePageChange}
    />
      {curPage}
    </div>
  );
};

export default App;
