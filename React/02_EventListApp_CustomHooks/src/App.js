import React from 'react';
import EventApp from './components/EventApp/EventApp';
import UpComingEvent from './components/UpComingEvents/UpComingEvents';
import CounterClass from './components/Counter/Counter';
import CounterFn from './components/Counter/CounterFn';

import './App.css';

import Header from './components/Header/Header';

const PAGESINFO = {
  EventManager: 'EventManager',
  UpComingEvent: 'UpComingEvent',
  CounterClass: 'CounterClass',
  CounterFn: 'CounterFn',
};
class App extends React.Component {
  state = {
    currentPage: PAGESINFO.EventManager,
    pagesInfo: PAGESINFO
  };

  hanldePageChange = (newPageInfo) => {
    this.setState({
      currentPage: newPageInfo,
    });
  };

  handleCountChange = (newCount) => {
    this.setState({
      count: newCount
    })
  }

  render() {
    const { currentPage, pagesInfo } = this.state;

    let curPage = null;
    switch (currentPage) {
      case PAGESINFO.EventManager:
        curPage = <EventApp handleCountChange={this.handleCountChange}/>;
        break;
      case PAGESINFO.UpComingEvent:
        curPage = <UpComingEvent/>;
        break;
      case PAGESINFO.CounterClass:
        curPage = <CounterClass/>;
        break;
      case PAGESINFO.CounterFn:
        curPage = <CounterFn/>;
        break;
      default:
    }

    return (
      <div className="App">
        <Header
    pagesInfo={pagesInfo}
    hanldePageChange={this.hanldePageChange}
    />
        {curPage}
      </div>
    );
  }
}

export default App;
