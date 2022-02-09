import {render, createAllEventListTmp, convertDay} from './view.js';

class Event {
  constructor(eventName, startDate, endDate) {
    this.eventName = eventName;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

class State {
  _eventList = [];

  get eventList() {
    return this._eventList;
  }

  set eventList(newdata) {
    newdata.forEach(obj => {
      obj.startDate = obj.startDate.length > 10? convertDay(obj.startDate) : obj.startDate;
      obj.endDate = obj.endDate.length > 10? convertDay(obj.endDate) : obj.endDate;
    })
    this._eventList = newdata;

    const ele = $('#table-body');
    const tmp = createAllEventListTmp(this._eventList);
    render(ele, tmp);
  }
}

export {
  Event,
  State
}