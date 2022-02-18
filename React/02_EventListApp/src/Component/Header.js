import {useState} from "react";

export default function Header({selected, setSelected}) {
    return (<div style={{display: "flex", marginBottom: '1vw'}}>
        <div className={(selected===0? 'upcomingEventsApp__selected ': '') + 'upcomingEventsApp__nav'}
             onClick={() => setSelected(0)}>EventListApp</div>
        <div className={(selected===1? 'upcomingEventsApp__selected ': '') + 'upcomingEventsApp__nav'}
             onClick={() => setSelected(1)}>UpcomingEventsApp</div>
    </div>)
}