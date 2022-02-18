import './App.css';
import React from "react";
import {Api} from "./API/api";
import EventListHeader from "./Component/EventListHeader";
import EventListBody from "./Component/EventListBody";
import EventListAddRow from "./Component/EventListAddRow";

class UpcomingEventsApp extends React.Component {
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
            eventList: eventList.filter(ev => new Date(+ev.startDate) > new Date())
        });
    }

    render() {
        return (
            <div className="App">
                <section className="table-container">
                    <EventListAddRow type={'upcoming'} addEventRow={this.addEventRow}/>
                    <table>
                        <EventListHeader type={'upcoming'}/>
                        <EventListBody type={'upcoming'}
                                       eventList={this.state.eventList}
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

export default UpcomingEventsApp;
