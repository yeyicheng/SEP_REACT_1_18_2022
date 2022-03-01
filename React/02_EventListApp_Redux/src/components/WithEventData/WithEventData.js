import React from "react";
import {
  getAllEvents,
  addNewEvent,
  deleteEvent,
  editEvent,
} from "../../services/event.api";
import { EventData } from "../../models/EventData";
import WithAbort from "../WithAbort/WithAbort";

class WithEventData extends React.Component {
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
  // API CALL
  fetchAllEvents = () => {
    // const { fetchResult, controller } = getAllEvents();
    // if (this.controllerList) {
    //   this.controllerList.push(controller);
    // } else {
    //   this.controllerList = [controller];
    // }
    // fetchResult.then((data) => {
    //   const events = data.map(({ eventName, startDate, endDate, id }) => {
    //     const newEvent = new EventData(eventName, startDate, endDate, id);
    //     this.generateEditEventState(newEvent);
    //     return newEvent;
    //   });

    //   this.setState({
    //     events,
    //   });
    // });

    getAllEvents(this.props.createSignal())
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
    return editEvent(updateEvent, this.props.createSignal())
      .then((data) => {
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
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  // API CALL
  handleDeleteEvent = (deletedEvent) => {
    return deleteEvent(deletedEvent, this.props.createSignal())
      .then((data) => {
        this.setState({
          events: this.state.events.filter((event) => {
            if (event.id === deletedEvent.id) {
              return false;
            } else {
              return true;
            }
          }),
        });
      })
      .catch((err) => {
        console.warn(err);
      });
  };
  // API CALL
  handleAddEvent = (addEvent) => {
    return addNewEvent(addEvent, this.props.createSignal())
      .then(({ eventName, startDate, endDate, id }) => {
        const newEvent = new EventData(eventName, startDate, endDate, id);
        this.generateEditEventState(newEvent);
        this.setState({
          events: [...this.state.events, newEvent],
        });
      })
      .catch((err) => {
        console.warn(err);
      });
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
    return this.props.renderChildren(
      this.state.events,
      this.handleSetEdit,
      this.handleOnChangeEditEvent,
      this.handleAddEvent,
      this.handleUpdateEvent,
      this.handleDeleteEvent
    );
  }
}

const WithEventDataAbort = (props) => {
  return (
    <WithAbort
      renderChildren={(createSignal) => {
        return <WithEventData {...props} createSignal={createSignal} />;
      }}
    />
  );
};

// const WithEventDataAbort = (props) => <WithEventData {...props} />;

export default WithEventDataAbort;
