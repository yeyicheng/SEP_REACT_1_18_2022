const baseURL = 'http://localhost:3000';
const path = 'events';

export const getAllEvents = () => {
  const controller = new AbortController();
  const signal = controller.signal;
  return {
    controller,
    fetchResult: fetch([baseURL, path].join('/'), {
      method: 'GET',
      signal,
    }).then(
      (response) =>
        new Promise((res, rej) => {
          setTimeout(() => {
            res(response.json());
          }, 100);
        })
    ),
  };
};

export const addNewEvent = (newEvent) =>
  fetch([baseURL, path].join('/'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(newEvent),
  }).then((response) => response.json());

export const deleteEvent = (event) =>
  fetch([baseURL, path, event.id].join('/'), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());

export const editEvent = (editEvent) =>
  fetch([baseURL, path, editEvent.id].join('/'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(editEvent),
  }).then((response) => response.json());
