import React, { useEffect, useState } from "react";
import "./EventApp.css";

import { EventData } from "../../models/EventData";

import EventDataRow from "../EventDataRow/EventDataRow";
import EventTable from "../EventTable/EventTable";
import Button from "../Button/Button";
import { useEventData } from "../../hooks/useEventData";

const EventApp = () => {
  const {
    events,
    handleOnChangeEditEvent,
    handleDeleteEvent,
    handleSetEdit,
    handleAddEvent,
    handleUpdateEvent,
  } = useEventData();

  // eslint-disable-next-line no-unused-vars
  const [dataCol, setDataCol] = useState([
    "Event Name",
    "Start Date",
    "End Date",
    "Actions",
  ]);
  const [isShowAddEventRow, setIsShowAddEventRow] = useState(false);
  const [newEvent, setNewEvent] = useState(
    new EventData("", "" + Date.now(), "" + Date.now())
  );

  useEffect(() => {
    return () => {
      // console.log("EVENTAPP componentWillUnmount ");
    };
  }, []);

  const hanldeAddEvent = () => {
    setIsShowAddEventRow(true);
  };

  const hanldeOnChange = (newEvent) => {
    setNewEvent(newEvent);
  };

  const handleCloseAddNew = () => {
    setIsShowAddEventRow(false);
    setNewEvent(new EventData("", "" + Date.now(), "" + Date.now()));
  };

  const hanldeSaveAddNew = () => {
    const { eventName, startDate, endDate } = newEvent;
    const _newEvent = new EventData(eventName, startDate, endDate);
    _newEvent.parseTimeStamp();
    if (_newEvent.isValidForSave()) {
      handleAddEvent(_newEvent).then((data) => {
        handleCloseAddNew();
      });
    } else {
      alert("inValid");
    }
  };

  const handleEditSave = (editEventObj) => {
    handleUpdateEvent(editEventObj).then((data) => {
      handleSetEdit(editEventObj, false);
    });
  };

  const renderHeader = () => (
    <Button onClick={hanldeAddEvent}>Add Event</Button>
  );

  const renderFooter = () => {
    if (isShowAddEventRow) {
      return (
        <EventDataRow
          event={newEvent}
          actions={[
            {
              actionName: "Save",
              actionFn: hanldeSaveAddNew,
            },
            {
              actionName: "Close",
              actionFn: handleCloseAddNew,
            },
          ]}
          handleOnchange={hanldeOnChange}
        ></EventDataRow>
      );
    } else {
      return null;
    }
  };

  // console.log("render Event App");

  return (
    <EventTable
      dataCol={dataCol}
      renderFooter={renderFooter}
      renderHeader={renderHeader}
    >
      {events?.map((event) =>
        event.isEditing ? (
          <EventDataRow
            key={event.id}
            event={event.editEvent}
            actions={[
              {
                actionName: "Save",
                actionFn: handleEditSave,
              },
              {
                actionName: "Cancel",
                actionFn: () => handleSetEdit(event, false),
              },
            ]}
            handleOnchange={handleOnChangeEditEvent}
          ></EventDataRow>
        ) : (
          <EventDataRow
            key={event.id}
            event={event}
            actions={[
              {
                actionName: "Edit",
                actionFn: () => handleSetEdit(event, true),
              },
              {
                actionName: "Delete",
                actionFn: handleDeleteEvent,
              },
            ]}
          ></EventDataRow>
        )
      )}
    </EventTable>
  );
};

// const EventManger = withEventData(EventApp);

// const EventManger = () => {
//   return (
//     <WithEventData
//       renderChildren={(
//         events,
//         handleSetEdit,
//         handleOnChangeEditEvent,
//         handleAddEvent,
//         handleUpdateEvent,
//         handleDeleteEvent
//       ) => {
//         return (
//           <EventApp
//             events={events}
//             handleSetEdit={handleSetEdit}
//             handleOnChangeEditEvent={handleOnChangeEditEvent}
//             handleAddEvent={handleAddEvent}
//             handleUpdateEvent={handleUpdateEvent}
//             handleDeleteEvent={handleDeleteEvent}
//           />
//         );
//       }}
//     />
//   );
// };

// const EventManger = () => {
//   return (
//     <WithAbort
//       renderChildren={(createSignal) => {
//         return (
//           <WithEventData
//             createSignal={createSignal}
//             renderChildren={(
//               events,
//               handleSetEdit,
//               handleOnChangeEditEvent,
//               handleAddEvent,
//               handleUpdateEvent,
//               handleDeleteEvent
//             ) => {
//               return (
//                 <EventApp
//                   events={events}
//                   handleSetEdit={handleSetEdit}
//                   handleOnChangeEditEvent={handleOnChangeEditEvent}
//                   handleAddEvent={handleAddEvent}
//                   handleUpdateEvent={handleUpdateEvent}
//                   handleDeleteEvent={handleDeleteEvent}
//                 />
//               );
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

export default EventApp;
