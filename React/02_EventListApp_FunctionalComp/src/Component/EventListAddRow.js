import React from "react";

export default function EventListAddRow(props) {
    return (<div className="add-content">
            <button onClick={props.addEventRow} className="add-btn">ADD NEW</button>
        </div>);
}