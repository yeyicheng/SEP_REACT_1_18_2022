// const baseURL = "http://localhost:9000";
// const path = "events";

// export const getAllEvents = (signal) =>
//   fetch([baseURL, path].join("/"), {
//     method: "GET",
//     signal,
//   }).then(
//     (response) =>
//       new Promise((res, rej) => {
//         setTimeout(() => {
//           res(response.json());
//         }, 2000);
//       })
//   );

// export const addNewEvent = (newEvent, signal) =>
//   fetch([baseURL, path].join("/"), {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(newEvent),
//     signal,
//   }).then((response) => response.json());

// export const deleteEvent = (event, signal) =>
//   fetch([baseURL, path, event.id].join("/"), {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     signal,
//   }).then((response) => response.json());

// export const editEvent = (editEvent, signal) =>
//   fetch([baseURL, path, editEvent.id].join("/"), {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify(editEvent),
//     signal,
//   }).then((response) => response.json());

const baseURL = "http://localhost:9000";
const path = "events";

const request = async (url, option) => {
  // config
  const defaultOption = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const { signal, ...restOptions } = option;

  let fetchOption;
  if (signal) {
    fetchOption = {
      ...defaultOption,
      ...restOptions,
      signal,
    };
  } else {
    fetchOption = { ...defaultOption, ...restOptions };
  }

  // console.log(fetchOption);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        fetch(url, fetchOption)
          .then((response) => {
            return response.json();
          })
          .catch((err) => {
            reject(err);
          })
      );
    }, 0);
  });

  // return fetch(url, fetchOption).then(
  //   (response) =>
  //     new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         resolve(response.json());
  //       }, 3000);
  //     })
  // );
};

export const getAllEvents = (signal = null) =>
  request([baseURL, path].join("/"), { method: "GET", signal });

export const addNewEvent = (newEvent, signal = null) =>
  request([baseURL, path].join("/"), {
    method: "POST",
    body: JSON.stringify(newEvent),
    signal,
  });

export const deleteEvent = (event, signal = null) =>
  request([baseURL, path, event.id].join("/"), { method: "DELETE", signal });

export const editEvent = (editEvent, signal = null) =>
  request([baseURL, path, editEvent.id].join("/"), {
    method: "PUT",
    body: JSON.stringify(editEvent),
    signal,
  });
