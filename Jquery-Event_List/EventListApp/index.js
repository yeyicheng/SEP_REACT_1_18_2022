// <---------- API ----------> //

const connect = (() => {
    url = "http://localhost:3000/events";

    const getEvents = () =>
        fetch(url).then((response) => response.json());

    const addEvent = (event) =>
        fetch(url, {
            method: "POST",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());

    const deleteEvent = id =>
        fetch([url, id].join("/"), {
            method: "DELETE",
        });

    const editEvent = event =>
        fetch([url, event.id].join("/"), {
            method: "PUT",
            body: JSON.stringify(event),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());


    return { getEvents, addEvent, deleteEvent, editEvent };
})();

// <---------- View ----------> //

const View = (() => {

    const eleId = {
        events: "#event__container",
        input_event_name: "#event__add__name__input",
        input_event_start_date: "#event__add__start__date__input",
        input_event_end_date: "#event__add__end__date__input",
        input_event_submit: "#event__add__submit",
        edit_input_name: ".input_name",
        edit_btn: "#edit__btn",
        delete_btn: ".del__btn"

    };

    const render = (element, tmp) => {
        element.innerHTML = tmp;
    };

    const formatDate = (ele) => {
        ele.startDate = new Date(+ele.startDate);
        ele.endDate = new Date(+ele.endDate);
        ele.startDate = ele.startDate.getFullYear() + '-' + (ele.startDate.getMonth() + 1) + '-' +  (ele.startDate.getDate()+ 1);
        ele.endDate = ele.endDate.getFullYear() + '-' + (ele.endDate.getMonth() + 1)  + '-' +  (ele.endDate.getDate()+ 1);
        ele.startDate = ele.startDate.split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("-");
        ele.endDate = ele.endDate.split(/\D/).slice(0,3).map(num=>num.padStart(2,"0")).join("-");
    }

    const createTmp = (arr) => {
        let tmp = "";
        arr.forEach((ele) => {

            formatDate(ele);

            tmp += `
            <tr class="event_display_container">
              <td class="event_display_name">
                <input disabled class=${ele.eventName} id="event__name" value=${ele.eventName}>
              </td>
              <td>
                <input disabled type="date" class=${ele.eventName} id="event__start__date" value=${ele.startDate}>
              </td>
              <td>
              <input disabled type="date" class=${ele.eventName} id="event__end__date" value=${ele.endDate}>
              </td>
              <td>
                <button class="btn edit__btn" id="edit__btn" name="edit" value=${ele.eventName}>EDIT</button>
                <button class="btn del__btn" name="delete" id=${ele.id}>DELETE</button>
              </td>
            </tr>
            `;
        });
        return tmp;
    };

    return {
        eleId,
        render,
        createTmp,
    };
})();

// <---------- Model ----------> //
const Model = ((api, view) => {
    class Event {
        constructor(eventName, startDate, endDate, id) {
            this.eventName = eventName;
            this.startDate = startDate;
            this.endDate = endDate;
            this.id = id;
        }
    }

    class State {
        #events = [];

        get events() {
            return this.#events;
        }

        set events(newdata) {
            this.#events = newdata;

            const ele = document.querySelector(view.eleId.events);
            const tmp = view.createTmp(this.#events);
            view.render(ele, tmp);
        }
    }

    const getEvents = api.getEvents;
    const addEvent = api.addEvent;
    const deleteEvent = api.deleteEvent;
    const editEvent = api.editEvent;

    return {
        Event,
        State,
        getEvents,
        addEvent,
        deleteEvent,
        editEvent

    };

})(connect, View);
// <---------- Controller ----------> //

const Controller = ((model, view) => {
    const state = new model.State();

    const addEvent = () => {
        const input_event_name = document.querySelector(view.eleId.input_event_name);
        const input_event_submit = document.querySelector(view.eleId.input_event_submit);
        const input_event_start_date = document.querySelector(view.eleId.input_event_start_date);
        const input_event_end_date = document.querySelector(view.eleId.input_event_end_date);

        input_event_submit.addEventListener("click", (event) => {
            const eventNew = new model.Event(
                input_event_name.value,
                input_event_start_date.valueAsNumber.toString(),
                input_event_end_date.valueAsNumber.toString()
            );
            console.log(eventNew);
            model.addEvent(eventNew).then((newEvent) => { 
                state.events = [...state.events, newEvent];
                window.location.reload();
            })
            event.target.value = "";
        });
    };

    const deleteEvent = () => {
        const ele = document.querySelector(view.eleId.events);
        ele.addEventListener("click", (event) => {
            if (event.target.id !== '' && event.target.name === "delete") {
                state.events = state.events.filter((obj) => {
                    return +obj.id !== +event.target.id;
                });
                console.log(event.target.id);
                model.deleteEvent(event.target.id);
            }
        });
    };

    const editEvent = () => {
        const ele = document.querySelector(view.eleId.events);
        ele.addEventListener("click", (event) => {
            if (event.target.name === "edit") {
                console.log(event.target.value);
                let selected_event = state.events.find((obj) => {
                    return obj.eventName === event.target.value;
                });
                console.log(selected_event);
                const input_to_edit = document.querySelectorAll(`.${selected_event.eventName}`);
                console.log(input_to_edit);
                input_to_edit.forEach((input) => {
                    input.disabled = false;
                });
                const input_to_save = document.querySelector(`.${selected_event.eventName}`);
                input_to_save.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        const input_event_name = document.querySelector(`#event__name.${selected_event.eventName}`);
                        const input_event_start_date = document.querySelector(`#event__start__date.${selected_event.eventName}`);
                        const input_event_end_date = document.querySelector(`#event__end__date.${selected_event.eventName}`);
                        const eventUpdated = new model.Event(
                            input_event_name.value,
                            input_event_start_date.valueAsNumber.toString(),
                            input_event_end_date.valueAsNumber.toString(),
                            id = selected_event.id
                        );
                        console.log(eventUpdated);
                        model.editEvent(eventUpdated).then((newEvent) => { 
                            state.events = [...state.events, newEvent];
                            window.location.reload();
                        });
                    };
                });
                
            }
        });
    };

    const init = () => {
        model.getEvents().then((data) => {
            state.events = data;
        });
    };

    const startUp = () => {
        init();
        addEvent();
        deleteEvent();
        editEvent();
    };

    return { startUp };

})(Model, View);

Controller.startUp();