import { State, Event } from './model.js';
import { render, createAllEventListTmp, createNewRowTmp } from './view.js';
import { getEvents, addEvent, deleteEvent, updateEvent } from './api.js';

const state = new State();

const addEventsfunc = () => {
  const addBtn = $('.addBtn');
  addBtn.on("click", (e) => {
    const newRow = createNewRowTmp();
    let tr = $('<tr/>')
    tr.append(newRow);
    $('#table-body').append(tr);
    // Add save function
    const saveBtn = $('.save_add');

    saveBtn.on("click", (e) => {

      const newEvent = new Event(
        $('#event_row_add_input').val(),
        $('#startdate_row_add_input').val(),
        $('#enddate_row_add_input').val(),
      )

      addEvent(newEvent)
        .then(newE => state.eventList = [...state.eventList, newE]);
    })

  })

}

const addDeleteFunc = () => {
  const ele = $('#table-body');
  ele.on("click", (e) => {
    const targetId = e.target.id.length - 1
    if ($(e.target).attr('class') === 'delete') {
      state.eventList = state.eventList.filter((event) => {
        return +event.id !== +e.target.id.split('')[targetId];
      });
      deleteEvent(e.target.id.split('')[targetId]);
    }
  })
}

const addEditFunc = () => {
  const ele = $('#table-body');

  ele.on("click", (e) => {
    if ($(e.target).attr('class') === 'edit') {
      const parent = $(e.target).parent().parent();
      const id = parent.attr('id').split('')[parent.attr('id').length - 1];
      const currentEventTd = $(`#event_row${id}`);
      const currentStartTd = $(`#startdate_row${id}`);
      const currentEndTd = $(`#enddate_row${id}`);


      currentEventTd.html(`<input type='text' id='event_text${id}'>`);
      currentStartTd.html(`<input type='date' id='startdate_text${id}'>`);
      currentEndTd.html(`<input type='date' id='enddate_text${id}'>`);
      $(e.target).hide();
      $(`#save_button${id}`).css("display", 'block');


      const saveBtn = $(`#save_button${id}`);
      saveBtn.on("click", (e) => {

        const newEvent = new Event(
          $(`#event_text${id}`).val(),
          $(`#startdate_text${id}`).val(),
          $(`#enddate_text${id}`).val()
        )

        updateEvent(id, newEvent)
          .then(() => {
            getEvents()
              .then((data) => {
                state.eventList = data;
              })
          })

      })
    }
  })
}

const init = () => {
  getEvents().then((data) => {
    state.eventList = data;
  })
}

const bootstrap = () => {
  init();
  addEventsfunc();
  addEditFunc();
  addDeleteFunc();
}

export { bootstrap }