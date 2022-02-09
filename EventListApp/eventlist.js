import { timestampToStr, dateStrToTimestamp } from "./util/timestamp.js";

const ADD_NEW_BTN = "#eventlist_add";
const EVENTLIST_CONTAINER = "#eventlist_container";

const EventList = () => {
  const addNewBtn = $(ADD_NEW_BTN);
  const eventListContainer = $(EVENTLIST_CONTAINER);

  // PRIVATE
  const selectRowById = (rowId) => {
    return Array.from(eventListContainer.children).filter(
      (row) => +row.dataset.row_id === +rowId
    )[0];
  };

  let isEditMode = false;

  // PUBLIC
  const registerAddEvent = (cb) => {
    addNewBtn.click = cb;
  };

  const containerEvent = (cb) => {
    eventListContainer.click = cb;
  };

  const editable = (isReadonly) => {
    return isReadonly ? "readonly" : "";
  };
  const focusTag = (isReadonly) => {
    return isReadonly ? "" : "autofocus";
  };

  const createEventListItem = (eventData, isReadonly = true) => {
    let updateBtnText = "";

    if (isEditMode) {
      updateBtnText = "UPDATE";
    } else {
      updateBtnText = "SAVE";
    }

    return `
      <div class="eventlist__row" data-row_id="${eventData && eventData.id}">
        <div class="eventlist__item">
          <input type="text" id="name_${eventData && eventData.id}" 
          value="${eventData ? eventData.eventName : ""}" 
          ${editable(isReadonly)} ${focusTag(isReadonly)} />
        </div>
        <div class="eventlist__item">
          <input id="start_date_${eventData && eventData.id}" 
          type="${isReadonly ? "text" : "date"}" 
          value="${eventData ? timestampToStr(eventData.startDate) : ""}" 
          ${editable(isReadonly)} />
        </div>
        <div class="eventlist__item">
          <input id="end_date_${eventData && eventData.id}" 
          type="${isReadonly ? "text" : "date"}" 
          value="${eventData ? timestampToStr(eventData.endDate) : ""}" 
          ${editable(isReadonly)} />
        </div>
        <div class="eventlist__actions">
          <input type="button" value="${
            isReadonly ? "EDIT" : updateBtnText
          }" data-edit_id="${eventData && eventData.id}" />
          <input type="button" value="${
            isReadonly ? "DELETE" : "CLOSE"
          }" data-del_id="${eventData && eventData.id}" />
        </div>
      </div>
    `;
  };

  const updateList = (eventsList) => {
    let eventsHTML = "";
    eventsList.forEach((eventItem) => {
      eventsHTML += createEventListItem(eventItem);
    });

    eventListContainer.html(eventsHTML);
  };

  const addEventRow = (dataSource) => {
    let eventsHTML = "";
    dataSource.forEach((eventItem) => {
      eventsHTML += createEventListItem(eventItem);
    });

    eventsHTML += createEventListItem(undefined, false);

    eventListContainer.html(eventsHTML);
  };

  const fetchValues = (row_id) => {
    if (row_id) {
      const nameEle = document.querySelector(`#name_${row_id}`);
      const startDateEle = document.querySelector(`#start_date_${row_id}`);
      const endDateEle = document.querySelector(`#end_date_${row_id}`);

      return {
        eventName: nameEle.value,
        startDate: `${dateStrToTimestamp(startDateEle.value)}`,
        endDate: `${dateStrToTimestamp(endDateEle.value)}`,
      };
    } else {
      const inputs = document.querySelectorAll(
        `#eventlist_container > .eventlist__row:last-child input[type="text"],input[type="date"]`
      );

      return {
        eventName: inputs[0].value,
        startDate: `${dateStrToTimestamp(inputs[1].value)}`,
        endDate: `${dateStrToTimestamp(inputs[2].value)}`,
      };
    }
  };

  // toggle edit mode
  const editMode = (dataSource, rowId) => {
    isEditMode = true;
    // #TEST
    const rowNode = selectRowById(rowId);
    console.log(rowNode);

    let eventsHTML = "";
    dataSource.forEach((eventItem) => {
      if (+rowId === eventItem.id) {
        eventsHTML += createEventListItem(
          {
            eventName: eventItem.eventName,
            startDate: eventItem.startDate,
            endDate: eventItem.endDate,
            id: eventItem.id,
          },
          false
        );
      } else {
        eventsHTML += createEventListItem(eventItem);
      }
    });

    eventListContainer.html(eventsHTML);
  };

  const clearEditMode = () => {
    isEditMode = false;
  };

  return {
    registerAddEvent,
    containerEvent,
    updateList,
    addEventRow,
    editMode,
    clearEditMode,
    fetchValues,
  };
};

export default EventList();
