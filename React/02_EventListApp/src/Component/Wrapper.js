import {useState} from "react";
import Header from "./Header";
import App from "../App";
import UpcomingEventsApp from "../UpcomingEventsApp";

export default function Wrapper() {
    const [selected, setSelected] = useState(0);
    return (<div>
        <Header selected={selected} setSelected={setSelected}/>
        {selected === 0 && <App />}
        {selected === 1 && <UpcomingEventsApp />}
    </div>)
}