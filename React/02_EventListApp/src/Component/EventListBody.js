import React from "react";
import EventListRow from "./EventListRow";

export default class EventListBody extends React.Component {
    render() {
        return <tbody id="table-body">
        {
            this.props.eventList.map(ev => {
            return <EventListRow ev={ev} key={ev.id}
                                 changeInput={this.props.changeInput}
                                 editEventRow={this.props.editEventRow}
                                 deleteEventRow={this.props.deleteEventRow}
                                 saveEventRow={this.props.saveEventRow}
                                 updateEventRow={this.props.updateEventRow}
                                 removeNewRow={this.props.removeNewRow}/>
        })}
        </tbody>
    }
}