import React from "react";
import EventListRow from "./EventListRow";

export default function EventListBody(props) {
    return (<tbody id="table-body">
    {
        props.eventList.map(ev => {
            return <EventListRow ev={ev} key={ev.id}
                                 changeInput={props.changeInput}
                                 editEventRow={props.editEventRow}
                                 deleteEventRow={props.deleteEventRow}
                                 saveEventRow={props.saveEventRow}
                                 updateEventRow={props.updateEventRow}
                                 removeNewRow={props.removeNewRow}/>
        })}
    </tbody>);
}