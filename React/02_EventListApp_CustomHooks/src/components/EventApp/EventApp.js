import React from 'react';
import './EventApp.css';

import { EventData } from '../../models/EventData';

import EventDataRow from '../EventDataRow/EventDataRow';
import EventTable from '../EventTable/EventTable';
import Button from '../Button/Button';
import { useEventData } from '../../hooks/useEventData';

const EventApp = ({handleCountChange, count}) => {
  const [dataCol] = React.useState([
    'Event Name',
    'Start Date',
    'End Date',
    'Actions',
  ]);
  const [isShowAddEventRow, setIsShowAddEventRow] = React.useState(false);
  const [newEvent, setNewEvent] = React.useState(
    new EventData('', '' + Date.now(), '' + Date.now())
  );
  const [
    events,
    handleUpdateEvent,
    handleDeleteEvent,
    handleAddEvent,
    handleSetEdit,
    handleOnChangeEditEvent
  ] = useEventData();

  const hanldeAddEvent = () => {
    setIsShowAddEventRow(true);
  };
  const hanldeOnChange = (newEvent) => {
    setNewEvent(newEvent);
  };

  const handleCloseAddNew = () => {
    setIsShowAddEventRow(false);
    setNewEvent(new EventData('', '' + Date.now(), '' + Date.now()));
  };

  const hanldeSaveAddNew = (newEventD) => {
    console.log('click');
    console.log('before', newEventD);
    const { eventName, startDate, endDate } = newEvent;

    const newEventData = new EventData(eventName, startDate, endDate);
    newEventData.parseTimeStamp();
    console.log('after', newEventData);
    if (newEventData.isValidForSave()) {
      handleAddEvent(newEventData).then((data) => {
        handleCloseAddNew();
      });
    } else {
      alert('inValid');
    }
  };

  const handleEditSave = (editEventObj) => {
    handleUpdateEvent(editEventObj).then((data) => {

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
        actionName: 'Save',
        actionFn: hanldeSaveAddNew,
      },
      {
        actionName: 'Close',
        actionFn: handleCloseAddNew,
      },
    ]}
    handleOnchange={hanldeOnChange}
    />
      );
    } else {
      return null;
    }
  };

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
    handleCountChange={handleCountChange}
    actions={[
      {
        actionName: 'Save',
        actionFn: handleEditSave,
      },
      {
        actionName: 'Cancel',
        actionFn: () => handleSetEdit(event, false),
      },
    ]}
    handleOnchange={handleOnChangeEditEvent}
    />
        ) : (
          <EventDataRow
    key={event.id}
    event={event}
    actions={[
      {
        actionName: 'Edit',
        actionFn: () => handleSetEdit(event, true),
      },
      {
        actionName: 'Delete',
        actionFn: handleDeleteEvent,
      },
    ]}
    />
        )
      )}
    </EventTable>
  );
};

export default EventApp;
