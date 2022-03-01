const initialState = {
  events: [],
};

export const eventDataReducer = (state = initialState, action) => {
  const { events } = state;
  switch (action.type) {
    case "event/get":
      return {
        events: action.payload,
      };

    case "event/add":
      return {
        events: [...events, action.payload],
      };

    case "event/update":
      const updatedEvent = action.payload;

      const updatedEvents = events.map((event) => {
        if (event.id === updatedEvent.id) {
          return { ...event, ...updatedEvent };
        } else {
          return event;
        }
      });
      return {
        events: updatedEvents,
      };
    case "event/delete":
      const deletedEvent = action.payload;

      const newEvents = events.filter((event) => {
        return event.id !== deletedEvent.id;
      });

      return {
        events: newEvents,
      };

    case "event/setEdit":
      const { setEditEvent, isEdit } = action.payload;
      const setEditEvents = events.map((event) => {
        if (event.id === setEditEvent.id) {
          return { ...setEditEvent, isEditing: isEdit };
        } else {
          return event;
        }
      });
      return {
        events: setEditEvents,
      };
    case "event/onChangeEditEvent":
      const editEvent = action.payload;
      const onChangeEvents = events.map((event) => {
        if (event.id === editEvent.id) {
          return {
            ...event,
            editEvent: { ...editEvent },
          };
        } else {
          return event;
        }
      });
      return {
        events: onChangeEvents,
      };
    default:
      return state;
  }
};
