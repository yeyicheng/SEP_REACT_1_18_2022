import { Api } from "./api.js";
import EventList from "./eventlist.js";

(() => {
  let dataSource = [];

  const reRender = () => {
    Api.getEventList().then((json) => {
      dataSource = json;
      EventList.updateList(json);
    });
  };

  EventList.registerAddEvent((e) => {
    EventList.addEventRow(dataSource);
  });

  EventList.containerEvent((e) => {
    if (e.target.value === "SAVE") {
      // ADD
      const newEvent = EventList.fetchValues();
      Api.addEvent(newEvent, dataSource.length + 1).then((response) => {
        reRender();
      });
    } else if (e.target.value === "DELETE") {
      // DELETE
      Api.deleteEvent(+e.target.dataset.del_id).then((response) => {
        reRender();
      });
    } else if (e.target.value === "EDIT") {
      // Edit
      EventList.editMode(dataSource, e.target.dataset.edit_id);
    } else if (e.target.value === "UPDATE") {
      // UPDATE
      const updatedEvent = EventList.fetchValues(e.target.dataset.edit_id);

      console.log(e.target.dataset.edit_id);

      Api.updateEvent(updatedEvent, e.target.dataset.edit_id).then(
        (response) => {
          reRender();
        }
      );

      EventList.clearEditMode();
    } else if (e.target.value === "CLOSE") {
      // CLOSE EDITING
      reRender();

      EventList.clearEditMode();
    }
  });

  reRender();
})(Api, EventList);
