const base_url = "http://localhost:3000";
const EVENTS = "events";

const getEventList = () =>
  fetch([base_url, EVENTS].join("/"), { method: "GET" }).then((response) =>
    response.json()
  );

const addEvent = (event, id) =>
  fetch([base_url, EVENTS].join("/"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      eventName: event.eventName,
      startDate: event.startDate,
      endDate: event.endDate,
    }),
  }).then((response) => response.json());

const deleteEvent = (id) =>
  fetch([base_url, EVENTS, id].join("/"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

const updateEvent = (event, id) =>
  fetch([base_url, EVENTS, id].join("/"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      eventName: event.eventName,
      startDate: event.startDate,
      endDate: event.endDate,
    }),
  });

export const Api = {
  getEventList,
  addEvent,
  deleteEvent,
  updateEvent,
};
