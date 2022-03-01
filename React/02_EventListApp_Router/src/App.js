import React, { useState } from "react";
import EventApp from "./components/EventApp/EventApp";
import UpComingEvent from "./components/UpComingEvents/UpComingEvents";
import Counter from "./components/Counter/Counter";
import CounterFn from "./components/Counter/CounterFn";
import '../src/components/Header/Header.css';
import "./App.css";

import Header from "./components/Header/Header";
import {Link, Route, Router, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import EventCounter from "./components/EventCounter/EventCounter";
const history = createBrowserHistory();

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
      curPage = <Link to={'/eventApp'} />;
      break;
    case PAGESINFO.UpComingEvent:
      curPage = <Link to={'/upcomingEvent'} />;
      break;
    case PAGESINFO.CounterClass:
      curPage = <Link to={'/counter'} />;
      break;
    case PAGESINFO.CounterFn:
      curPage = <Link to={'/counterFn'}/>;
      break;
    default:
  }

  return (
      <Router history={history}>
    <div className="App">
      <header className="app-header">
        <nav className="app-header__nav">
          <EventCounter/>
          {Object.keys(pagesInfo).map((key) => (
              <Link to={`/${key}`}  key={key} onClick={(e) => hanldePageChange(e, key)}>
                {key}
              </Link>
          ))}
        </nav>
      </header>
        {/*{curPage}*/}
        <Switch>
          <Route path={`/${PAGESINFO.EventManager}`}>
            <EventApp/>
          </Route>
          <Route path={`/${PAGESINFO.UpComingEvent}`}>
            <UpComingEvent/>
          </Route>
          <Route path={`/${PAGESINFO.CounterClass}`}>
            <Counter />
          </Route>
          <Route path={`/${PAGESINFO.CounterFn}`}>
            <CounterFn />
          </Route>
        </Switch>
    </div>
      </Router>

  );
};

export default App;
