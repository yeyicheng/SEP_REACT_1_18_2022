import './App.css';
import React from "react";
import {Api} from "./API/api";
import EventListHeader from "./Component/EventListHeader";
import EventListBody from "./Component/EventListBody";
import EventListAddRow from "./Component/EventListAddRow";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            eventList: []
        }
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

    changeInput = ({target: {name, value}}, id, valueType) => {
        const curr = this.state.eventList.filter(ev => ev.id === id)[0];
        if (valueType === 'Date') {
            curr[name] = new Date(value).getTime().toString()
        } else {
            curr[name] = value;
        }
        this.setState({
            eventList: this.state.eventList
        })
    }

    saveEventRow = async (e, id, ev) => {
        ev.isNew = undefined;
        ev.id = undefined;
        ev.disabled = true;
        const newEv = await Api.addEvent(ev);
        this.updateUI(e, id, newEv);
    }

    removeNewRow = async (e, id) => {
        this.setState({
            eventList: this.state.eventList.filter(ev => ev.id !== id)
        });
    }

    updateUI = (e, id, newEv) => {
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

    updateEventRow = async (e, id, ev) => {
        ev.disabled = true;
        const newEv = await Api.updateEvent(id, ev);
        this.updateUI(e, id, newEv);
    }

    addEventRow = () => {
        this.setState({
            eventList: [...this.state.eventList, {
                id: new Date().getTime().toString(),
                isNew: true,
                disabled: false,
                startDate: '',
                endDate: '',
                eventName: ''
            }]
        })
    }

    editEventRow = async (e, id) => {
        const curr = this.state.eventList.filter(ev => ev.id === id)[0];
        curr.disabled = false;
        this.setState({
            eventList: this.state.eventList
        })
    }

    deleteEventRow = async (e, id) => {
        await Api.deleteEvent(id);
        this.setState({
            eventList: this.state.eventList.filter(ev => ev.id !== id)
        });
    }

    render() {
        return (
            <div className="App">
                <section className="table-container">
                    <EventListAddRow addEventRow={this.addEventRow}/>
                    <table>
                        <EventListHeader/>
                        <EventListBody eventList={this.state.eventList}
                                       changeInput={this.changeInput}
                                       editEventRow={this.editEventRow}
                                       deleteEventRow={this.deleteEventRow}
                                       saveEventRow={this.saveEventRow}
                                       updateEventRow={this.updateEventRow}
                                       removeNewRow={this.removeNewRow}/>
                    </table>
                </section>
            </div>
        );
    }
}

export default App;
