import React from "react";
import PropTypes from "prop-types";
const EventAddRow = ({
  newEvent,
  hanldeOnChange,
  hanldeSaveAddNew,
  handleClose,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="eventName"
          value={newEvent.eventName}
          onChange={hanldeOnChange}
        />
      </td>
      <td>
        <input
          onChange={hanldeOnChange}
          type="date"
          value={newEvent.startDate}
          name="startDate"
        />
      </td>
      <td>
        <input
          onChange={hanldeOnChange}
          name="endDate"
          type="date"
          value={newEvent.endDate}
        />
      </td>
      <td>
        <button onClick={hanldeSaveAddNew}>Save</button>
        <button onClick={handleClose}>Close</button>
      </td>
    </tr>
  );
};

EventAddRow.propTypes = {
  newEvent: PropTypes.object,
  hanldeOnChange: PropTypes.func,
  hanldeSaveAddNew: PropTypes.func,
  handleClose: PropTypes.func,
};

export default EventAddRow;
