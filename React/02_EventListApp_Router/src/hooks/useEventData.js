import { useEffect, useState } from "react";

import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  editEvent,
} from "../services/event.api";

import store from "../store/appStore";

import { EventData } from "../models/EventData";
import { useAbort } from "./useAbort";

const getEventsState = () => {
  const { events } = store.getState();

  return events;
};

export const useEventData = () => {
  const { createSignal } = useAbort();
  const [events, setEvents] = useState(getEventsState());

  store.subscribe(() => {
    setEvents(getEventsState());
  });

  useEffect(() => {
    fetchAllEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper
  const generateEditEventState = (event) => {
    event.isEditing = false;
    event.editEvent = new EventData(
      event.eventName,
      event.startDate,
      event.endDate,
      event.id
    );
  };

  // API CALL
  const fetchAllEvents = () => {
    getAllEvents(createSignal())
      .then((data) => {
        const events = data.map(({ eventName, startDate, endDate, id }) => {
          const newEvent = new EventData(eventName, startDate, endDate, id);
          generateEditEventState(newEvent);
          return newEvent;
        });

        store.dispatch({ type: "event/get", payload: events });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // API CALL
  const handleUpdateEvent = (updateEvent) => {
    return editEvent(updateEvent, createSignal())
      .then(({ eventName, startDate, endDate, id }) => {
        const updatedEvent = new EventData(eventName, startDate, endDate, id);
        generateEditEventState(updatedEvent);
        store.dispatch({ type: "event/update", payload: updatedEvent });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // API CALL
  const handleDeleteEvent = (deletedEvent) => {
    return deleteEvent(deletedEvent, createSignal())
      .then((data) => {
        store.dispatch({ type: "event/delete", payload: deletedEvent });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // API CALL
  const handleAddEvent = (addEvent) => {
    return addNewEvent(addEvent, createSignal())
      .then(({ eventName, startDate, endDate, id }) => {
        const newEvent = new EventData(eventName, startDate, endDate, id);
        generateEditEventState(newEvent);

        store.dispatch({ type: "event/add", payload: newEvent });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  // UI STATE
  const handleSetEdit = (setEditEvent, isEdit) => {
    store.dispatch({
      type: "event/setEdit",
      payload: { setEditEvent, isEdit },
    });
  };

  // UI STATE
  const handleOnChangeEditEvent = (editEvent) => {
    store.dispatch({ type: "event/onChangeEditEvent", payload: editEvent });
  };
  return {
    events,
    handleOnChangeEditEvent,
    handleDeleteEvent,
    handleSetEdit,
    handleAddEvent,
    handleUpdateEvent,
  };
};
