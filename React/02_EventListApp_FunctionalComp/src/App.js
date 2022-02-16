import './App.css';
import React, {useEffect, useState} from "react";
import {Api} from "./API/api";
import EventListHeader from "./Component/EventListHeader";
import EventListBody from "./Component/EventListBody";
import EventListAddRow from "./Component/EventListAddRow";

function App(props) {
    const [evList, setEvList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    useEffect(async () => {
        if (loading) {
            const eventList = await Api.getEvents();
            eventList.forEach(ev => {
                ev.disabled = true
            });
            setEvList(eventList)
            setLoading(false);
        }
    });

    let changeInput = ({target: {name, value}}, id, valueType) => {
        const curr = evList.filter(ev => ev.id === id)[0];
        if (valueType === 'Date') {
            curr[name] = new Date(value).getTime().toString()
        } else {
            curr[name] = value;
        }
        setEvList(evList);
    }

    let saveEventRow = async (e, id, ev) => {
        ev.isNew = undefined;
        ev.id = undefined;
        ev.disabled = true;
        const newEv = await Api.addEvent(ev);
        updateUI(e, id, newEv);
    }

    let removeNewRow = async (e, id) => {
        setEvList(evList.filter(ev => ev.id !== id))
    }

    let updateUI = (e, id, newEv) => {
        let index = -1;
        for (let i = 0; i < evList.length; i++) {
            if (evList[i].id === id) {
                index = i;
            }
        }
        evList.splice(index, 1, newEv);
        setEvList(evList);
        setKey(new Date().getTime());
    }

    let updateEventRow = async (e, id, ev) => {
        ev.disabled = true;
        const newEv = await Api.updateEvent(id, ev);
        updateUI(e, id, newEv);
    }

    let addEventRow = () => {
        setEvList([...evList, {
            id: new Date().getTime().toString(),
            isNew: true,
            disabled: false,
            startDate: '',
            endDate: '',
            eventName: ''
        }])
    }

    let editEventRow = async (e, id) => {
        const evListCopy = [...evList];
        const curr = evListCopy.filter(ev => ev.id === id)[0];
        curr.disabled = false;
        setEvList(evListCopy);
        setKey(new Date().getTime());
    }

    let deleteEventRow = async (e, id) => {
        await Api.deleteEvent(id);
        setEvList(evList.filter(ev => ev.id !== id));
    }
    return (
        <div className="App">
            <section className="table-container">
                <EventListAddRow addEventRow={addEventRow}/>
                <table>
                    <EventListHeader/>
                    <EventListBody key={key}
                                   eventList={evList}
                                   changeInput={changeInput}
                                   editEventRow={editEventRow}
                                   deleteEventRow={deleteEventRow}
                                   saveEventRow={saveEventRow}
                                   updateEventRow={updateEventRow}
                                   removeNewRow={removeNewRow}/>
                </table>
            </section>
        </div>
    );
}

export default App;
