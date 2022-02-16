import React, {useState} from "react";

export default function EventListRow(props) {
    const [ev, setEv] = useState(props.ev)

    return (<tr className="row" id={ev.id}>
        <td>
            <input disabled={ev.disabled} defaultValue={ev.eventName} type='text'
                   name={'eventName'}
                   onChange={e => props.changeInput(e, ev.id)}/>
        </td>
        <td>
            <input disabled={ev.disabled}
                   type='date'
                   name={'startDate'}
                   defaultValue={ev.startDate ? new Date(+ev.startDate).toISOString().slice(0, 10) : ''}
                   onChange={e => props.changeInput(e, ev.id, 'Date')}/>
        </td>
        <td>
            <input disabled={ev.disabled}
                   type='date'
                   name={'endDate'}
                   defaultValue={ev.endDate ? new Date(+ev.endDate).toISOString().slice(0, 10) : ''}
                   onChange={e => props.changeInput(e, ev.id, 'Date')}/>
        </td>
        <td>
            <button
                onClick={e => ev.isNew ? props.saveEventRow(e, ev.id, ev) : ev.disabled ? props.editEventRow(e, ev.id) : props.updateEventRow(e, ev.id, ev)}
                className="edit-btn">{ev.disabled ? 'EDIT' : 'SAVE'}</button>
            <button
                onClick={e => ev.isNew ? props.removeNewRow(e, ev.id) : props.deleteEventRow(e, ev.id)}
                className="delete-btn"
                value="DELETE">{ev.isNew ? 'CLOSE' : 'DELETE'}</button>
        </td>
    </tr>);
}