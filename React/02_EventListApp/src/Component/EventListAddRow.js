import React from "react";

export default class EventListAddRow extends React.Component {
    render() {
        return <div className="add-content">
            <button onClick={this.props.addEventRow} className="add-btn">ADD NEW</button>
        </div>
    }
}