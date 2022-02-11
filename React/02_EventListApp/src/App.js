import './App.css';
import React from "react";
import {Api} from "./API/api";
import EventListRow from "./Component/EventListRow";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      eventList: []
    }
    this.generateEventList = this.generateEventList.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.editEventRow = this.editEventRow.bind(this);
    this.deleteEventRow = this.deleteEventRow.bind(this);
    this.addEventRow = this.addEventRow.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.saveEventRow = this.saveEventRow.bind(this);
    this.updateEventRow = this.updateEventRow.bind(this);
  }

  async componentDidMount() {
    const eventList = await Api.getEvents();
    eventList.forEach(ev => {
      ev.disabled = true
    })
    this.setState({
      eventList: eventList
    });
  }

  changeInput(e, id, keyName, valueType) {
    const curr = this.state.eventList.filter(ev => ev.id === id)[0];
    if (valueType === 'Date') {
      curr[keyName] = new Date(e.target.value).getTime().toString()
    } else {
      curr[keyName] = e.target.value;
    }
    this.setState({
      eventList: this.state.eventList
    })
  }

  generateEventList() {
    return this.state.eventList.map(ev => {
      return <EventListRow ev={ev} key={ev.id}
                  changeInput={this.changeInput}
                  editEventRow={this.editEventRow}
                  deleteEventRow={this.deleteEventRow}
                  saveEventRow={this.saveEventRow}
                  updateEventRow={this.updateEventRow}/>
    })
  }

  async saveEventRow(e, id, ev) {
    ev.isNew = undefined;
    ev.id = undefined;
    ev.disabled = true;
    const newEv = await Api.addEvent(ev);
    this.updateUI(e, id, newEv);
  }

  removeNewRow(e, id) {
    this.setState({
      eventList: this.state.eventList.filter(ev => ev.id !== id)
    });
  }

  updateUI(e, id, newEv) {
    let index = -1;
    for (let i = 0; i < this.state.eventList.length; i++) {
      if (this.state.eventList[i].id === id) {
        index = i;
      }
    }
    this.state.eventList.splice(index, 1, newEv);
    this.setState({
      eventList: this.state.eventList
    })
  }

  async updateEventRow(e, id, ev) {
    ev.disabled = true;
    const newEv = await Api.updateEvent(id, ev);
    this.updateUI(e, id, newEv);
  }

  addEventRow() {
    this.state.eventList.push({id: new Date().getTime().toString(), isNew: true, disabled: false, startDate: '', endDate: '', eventName: ''})
    this.setState({
      eventList: this.state.eventList
    })
  }

  async editEventRow(e, id) {
    const curr = this.state.eventList.filter(ev => ev.id === id)[0];
    curr.disabled = false;
    this.setState({
      eventList: this.state.eventList
    })
  }

  async deleteEventRow(e, id) {
      await Api.deleteEvent(id);
      this.setState({
        eventList: this.state.eventList.filter(ev => ev.id !== id)
      });
  }

  render() {
    return (
        <div className="App">
          <section className="table-container">
            <div className="add-content">
              <button onClick={this.addEventRow} className="add-btn">ADD NEW</button>
            </div>
            <table>
              <tr className="header">
                <th>Event name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Actions</th>
              </tr>
              <tbody id="table-body">
              {this.generateEventList()}
              </tbody>
            </table>
          </section>
        </div>
    );
  }
}

export default App;
