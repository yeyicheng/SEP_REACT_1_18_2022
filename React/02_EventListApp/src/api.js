import axios from "axios";

export const Api = (() => {
    const baseUrl = "http://localhost:3000/events";

    // const getEvents = () => fetch(baseUrl).then((response) => response.json());
    const getEvents = async () =>
        (await axios.get(baseUrl)).data;

    const addEvent = async (event) =>
        (await axios.post(baseUrl,event)).data;

    const deleteEvent = async (id) =>
        (await axios.delete([baseUrl, id].join('/'))).data;

    const updateEvent = async (id, event) =>
        (await axios.put([baseUrl, id].join('/'), event)).data;

    return {
        getEvents,
        addEvent,
        deleteEvent,
        updateEvent,
    };
})();