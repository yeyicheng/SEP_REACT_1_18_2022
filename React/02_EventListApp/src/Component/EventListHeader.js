import React from "react";

export default class EventListHeader extends React.Component {
    render() {
        return <thead>
        <tr className="header">
            <th>Event name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Actions</th>
        </tr>
        </thead>
    }
}