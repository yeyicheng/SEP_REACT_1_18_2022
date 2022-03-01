import React from "react";
import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  editEvent,
} from "../services/event.api";
import { EventData } from "../models/EventData";

export const withEventData = (WrappedComponent) => {
  return class NewComponent extends React.Component {
    state = {
      events: [],
    };
    componentDidMount() {
      this.fetchAllEvents();
    }
    generateEditEventState = (event) => {
      event.isEditing = false;
      event.editEvent = new EventData(
        event.eventName,
        event.startDate,
        event.endDate,
        event.id
      );
    };
    componentWillUnmount() {
      if (this.controllerList) {
        this.controllerList.forEach((c) => {
          console.log("cancelAPI call");
          c.abort();
        });
      }
    }
    // API CALL
    fetchAllEvents = () => {
      const controller = new AbortController();
      if (this.controllerList) {
        this.controllerList.push(controller);
      } else {
        this.controllerList = [controller];
      }
      getAllEvents(controller.signal)
        .then((data) => {
          const events = data.map(({ eventName, startDate, endDate, id }) => {
            const newEvent = new EventData(eventName, startDate, endDate, id);
            this.generateEditEventState(newEvent);
            return newEvent;
          });

          this.setState({
            events,
          });
        })
        .catch((err) => {
          console.warn(err);
        });
    };
    // API CALL
    handleUpdateEvent = (updateEvent) => {
      return editEvent(updateEvent).then((data) => {
        this.setState({
          events: this.state.events.map((event) => {
            if (event.id === data.id) {
              return {
                ...event,
                ...data,
              };
            } else {
              return event;
            }
          }),
        });
      });
    };
    // API CALL
    handleDeleteEvent = (deletedEvent) => {
      return deleteEvent(deletedEvent).then((data) => {
        this.setState({
          events: this.state.events.filter((event) => {
            return event.id !== deletedEvent.id;
          }),
        });
      });
    };
    // API CALL
    handleAddEvent = (addEvent) => {
      return addNewEvent(addEvent).then(
        ({ eventName, startDate, endDate, id }) => {
          const newEvent = new EventData(eventName, startDate, endDate, id);
          this.generateEditEventState(newEvent);
          this.setState({
            events: [...this.state.events, newEvent],
          });
        }
      );
    };
    // UI STATE
    handleSetEdit = (setEditEvent, isEdit) => {
      this.setState({
        events: this.state.events.map((event) => {
          if (event.id === setEditEvent.id) {
            return { ...event, isEditing: isEdit };
          } else {
            return event;
          }
        }),
      });
    };
    // UI STATE
    handleOnChangeEditEvent = (editEvent) => {
      console.log(editEvent);
      this.setState({
        events: this.state.events.map((event) => {
          if (event.id === editEvent.id) {
            return {
              ...event,
              editEvent: { ...editEvent },
            };
          } else {
            return event;
          }
        }),
      });
    };

    render() {
      const { events } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          handleSetEdit={this.handleSetEdit}
          handleOnChangeEditEvent={this.handleOnChangeEditEvent}
          handleAddEvent={this.handleAddEvent}
          handleDeleteEvent={this.handleDeleteEvent}
          handleUpdateEvent={this.handleUpdateEvent}
          events={events}
          />
      );
    }
  };
};
