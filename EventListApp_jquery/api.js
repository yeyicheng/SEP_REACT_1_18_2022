const baseurl = "http://localhost:3000";
const path = "events";


const getEvents = () =>
  $.ajax([baseurl, path].join("/"),
    {
      dataType: 'json',
      timeout: 500,
      success: function (data, status, xhr) {
        let returnedData = JSON.parse(JSON.stringify(data));
      }
    });

const addEvent = (events) =>
  $.ajax([baseurl, path].join("/"), {
    type: 'POST',
    data: events,
    success: function (data, status, xhr) {
      let returnedData = JSON.parse(JSON.stringify(data));
    }
  })

const deleteEvent = (id) =>
  $.ajax([baseurl, path, id].join("/"), {
    type: "DELETE",
    success: function (data, status, xhr) {
      let returnedData = JSON.parse(JSON.stringify(data));
    }
  })

  const updateEvent = (id, event) =>
  $.ajax([baseurl, path, id].join("/"), {
    method: "PUT",
    data: event,
    success: function (data, status, xhr) {
      let returnedData = JSON.parse(JSON.stringify(data));
    }
  })

export {
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent
}