import React from "react";
import PropTypes from "prop-types";

const EventRow = ({ event, hanldeEdit, hanldeDelete }) => {
  return (
    <tr key={event.id}>
      <td>
        <input type="text" disabled value={event.eventName} />
      </td>
      <td>
        <input type="date" disabled value={event.startDate} />
      </td>
      <td>
        <input type="date" disabled value={event.endDate} />
      </td>
      <td>
        <button onClick={() => hanldeEdit(event.id)}>Edit</button>
        <button onClick={() => hanldeDelete(event.id)}>Delete</button>
      </td>
    </tr>
  );
};

EventRow.propTypes = {
  event: PropTypes.object,
  hanldeEdit: PropTypes.func,
  hanldeDelete: PropTypes.func,
};
export default EventRow;
