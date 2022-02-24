import React, {useState} from 'react';
import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  editEvent,
} from '../services/event.api';
import { EventData } from '../models/EventData';

export const useEventData = () => {
  const [events, setEvents] = useState([]);
  const generateEditEventState = (event) => {
    event.isEditing = false;
    event.editEvent = new EventData(
      event.eventName,
      event.startDate,
      event.endDate,
      event.id
    );
  };

  const handleUpdateEvent = (updateEvent) => {
    return editEvent(updateEvent).then((data) => {
      setEvents(events.map((event) => {
        if (event.id === data.id) {
          return {
            ...event,
            ...data,
            isEditing: false
          };
        } else {
          return event;
        }
      }));
    });
  };

  const handleDeleteEvent = (deletedEvent) => {
    return deleteEvent(deletedEvent).then((data) => {
      setEvents(
        events.filter((event) => {
          return event.id !== deletedEvent.id;
        })
      );
    });
  };
  // API CALL
  const handleAddEvent = (addEvent) => {
    return addNewEvent(addEvent).then(
      ({ eventName, startDate, endDate, id }) => {
        const newEvent = new EventData(eventName, startDate, endDate, id);
        generateEditEventState(newEvent);
        setEvents([...events, newEvent]);
      }
    );
  };
  // UI STATE
  const handleSetEdit = (setEditEvent, isEdit) => {
    setEvents(
      events.map((event) => {
        if (event.id === setEditEvent.id) {
          return { ...event, isEditing: isEdit };
        } else {
          return event;
        }
      })
    );
  };
  // UI STATE
  const handleOnChangeEditEvent = (editEvent) => {
    setEvents(
      events.map((event) => {
        if (event.id === editEvent.id) {
          return {
            ...event,
            editEvent: { ...editEvent },
          };
        } else {
          return event;
        }
      })
    );
  };

  React.useEffect(() => {
    const { fetchResult, controller } = getAllEvents();
    fetchResult.then((data) => {
      const events = data.map(({ eventName, startDate, endDate, id }) => {
        const newEvent = new EventData(eventName, startDate, endDate, id);
        generateEditEventState(newEvent);
        return newEvent;
      });

      setEvents(events);
    });
    return () => {
      controller.abort();
    };
  }, []);

  return [
    events,
    handleUpdateEvent,
    handleDeleteEvent,
    handleAddEvent,
    handleSetEdit,
    handleOnChangeEditEvent
  ];
};
