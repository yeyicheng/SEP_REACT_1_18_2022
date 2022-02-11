import React from "react";

class EventListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ev: this.props.ev
        }
    }
    render() {
        return <tr className="row" id={this.state.ev.id}>
            <td>
                <input disabled={this.state.ev.disabled} defaultValue={this.state.ev.eventName} type='text'
                       onChange={e => this.props.changeInput(e, this.state.ev.id, 'eventName')}/>
            </td>
            <td>
                <input disabled={this.state.ev.disabled}
                       type='date'
                       defaultValue={this.state.ev.startDate ? new Date(+this.state.ev.startDate).toISOString().slice(0, 10) : ''}
                       onChange={e => this.props.changeInput(e, this.state.ev.id, 'startDate', 'Date')}/>
            </td>
            <td>
                <input disabled={this.state.ev.disabled}
                       type='date'
                       defaultValue={this.state.ev.endDate ? new Date(+this.state.ev.endDate).toISOString().slice(0, 10) : ''}
                       onChange={e => this.props.changeInput(e, this.state.ev.id, 'endDate', 'Date')}/>
            </td>
            <td>
                <button onClick={e => this.state.ev.isNew? this.props.saveEventRow(e, this.state.ev.id, this.state.ev): this.state.ev.disabled? this.props.editEventRow(e, this.state.ev.id): this.props.updateEventRow(e, this.state.ev.id, this.state.ev)}
                        className="edit-btn">{this.state.ev.disabled? 'EDIT': 'SAVE'}</button>
                <button onClick={e => this.state.ev.isNew? this.props.removeNewRow(e, this.state.ev.id): this.props.deleteEventRow(e, this.state.ev.id)}
                        className="delete-btn" 
                        value="DELETE">{ this.state.ev.isNew? 'CLOSE': 'DELETE'}</button>
            </td>
        </tr>
    }
}

export default EventListRow;