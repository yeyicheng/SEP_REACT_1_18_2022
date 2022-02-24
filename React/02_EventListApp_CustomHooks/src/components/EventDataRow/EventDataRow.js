import React from 'react';
import Button from '../Button/Button';

function EventDataRow ({ event, handleOnchange, actions }) {
  const handleChange = ({ target: { name, value } }, event) => {
    console.log({ ...event, [name]: value });
    handleOnchange({ ...event, [name]: value });
  };
   return (
      <tr key={event.id}>
        <td>
          <input
            type="text"
            name="eventName"
            disabled={!handleOnchange}
            value={event.eventName}
            onChange={
              handleOnchange ? (e) => handleChange(e, event) : () => {}
            }
          />
        </td>
        <td>
          <input
            type="date"
            name="startDate"
            value={event.startDate}
            disabled={!handleOnchange}
            onChange={
              handleOnchange ? (e) => handleChange(e, event) : () => {}
            }
          />
        </td>
        <td>
          <input
            type="date"
            name="endDate"
            value={event.endDate}
            disabled={!handleOnchange}
            onChange={
              handleOnchange ? (e) => handleChange(e, event) : () => {}
            }
          />
        </td>
        {actions ? (
          <td>
            {actions.map((action) => {
              return (
                <Button
                  key={action.actionName}
                  onClick={() => action.actionFn(event)}
                >
                  {action.actionName}
                </Button>
              );
            })}
          </td>
        ) : null}
      </tr>
    );
}

export default EventDataRow;
