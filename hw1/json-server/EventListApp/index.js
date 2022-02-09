const Appapi = (() => {
    const baseurl = "http://localhost:3000/events";

    // const getEvents = () => fetch(baseurl).then((response) => response.json());
    const getEvents = () =>
        $.ajax({

            // The URL for the request
            url: baseurl,

        });

    const addEvent = (event) =>
        $.ajax({
            type: "POST",
            url: baseurl,
            data: event,
        });

    const deleteEvent = (id) =>
        $.ajax({
            type: "DELETE",
            url: [baseurl, id].join('/'),
        });

    const editEvent = (id, event) =>
        $.ajax({
            type: "PUT",
            url: [baseurl, id].join('/'),
            data: event,
        });

    return {
        getEvents,
        addEvent,
        deleteEvent,
        editEvent,
    };
})();

//View
const View = (() => {
    const domstr = {
        table: "#table-body",
        addbtn: ".add-btn",
        savebtn: "#input__savebtn",
        closebtn: "#input__closebtn",
        inputEventname: "#input__eventname",
        inputStartdate: "#input__startdate",
        inputEnddate: "#input__enddate",
    };

    //convert epoch date to formatted string
    const dateConvert = (date) => {
        let d = new Date(+date);
        return d.toISOString().slice(0, 10);
    };

    //create template for data recieved from api
    const createTemplate = (newdata) => {
        let tmp = "";
        newdata.forEach((event) => {
            let startDate = dateConvert(event.startDate);
            let endDate = dateConvert(event.endDate);
            tmp += `<tr class="row" id=${event.id}>
                <td>
                    <input disabled value="${event.eventName}">
                </td>
                <td>
                    <input disabled value=${startDate} >
                </td>
                <td>
                    <input disabled value=${endDate} >
                </td>
                    <td>
                        <button value="EDIT" class="edit-btn"}>EDIT</button>
                        <button class="delete-btn" value="DELETE">DELETE</button>
                    </td>
             </tr>`;
        });

        return tmp;
    };

    //render page
    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };

    return {
        domstr,
        render,
        createTemplate,
    };
})();

//Model
const Model = ((api, view) => {
    class Event {
        constructor(eventName, startDate, endDate) {
            this.eventName = eventName;
            this.startDate = startDate;
            this.endDate = endDate;
        }
    }

    class State {
        #eventlist = [];

        get eventlist() {
            return this.#eventlist;
        }

        set eventlist(newdata) {
            this.#eventlist = newdata;

            let ele = document.querySelector(view.domstr.table);
            let tmp = view.createTemplate(this.#eventlist);
            view.render(ele, tmp);
        }
    }
    const getEvents = api.getEvents;
    const addEvent = api.addEvent;
    const deleteEvent = api.deleteEvent;
    const editEvent = api.editEvent;

    return {
        State,
        Event,
        getEvents,
        addEvent,
        deleteEvent,
        editEvent,
    };
})(Appapi, View);

//Controller
const Controller = ((model, view) => {
    let state = new model.State();

    const addEvent = () => {
        $(view.domstr.addbtn).on('click', () => {
            $(view.domstr.table).append(`<tr id="add-row"><td>
                <input type="text" id="input__eventname" />
                </td>
                <td>
                    <input type="date" id="input__startdate"/>
                </td>
                <td>
                    <input type="date" id="input__enddate"/>
                </td>
                <td>
                    <button id="input__savebtn">SAVE</button>
                    <button id="input__closebtn">CLOSE</button>
                </td></tr>`)

            //gather 3 inputs value, adding to the a new event
            let newEvent = new model.Event();

            $(view.domstr.inputEventname).on('keyup', (e) => {
                newEvent.eventName = e.target.value;
            });

            $(view.domstr.inputStartdate).on('change', (e) => {
                const date = new Date(e.target.value);
                newEvent.startDate = date.getTime().toString();
            });

            $(view.domstr.inputEnddate).on('change', (e) => {
                const date = new Date(e.target.value);
                newEvent.endDate = date.getTime().toString();
            });

            $(view.domstr.savebtn).on('click', () => {
                model.addEvent(newEvent).then((newEvent) => {
                    state.eventlist = [...state.eventlist, newEvent];
                });
            });

            $(view.domstr.closebtn).on('click', () => {
                $('#add-row').remove();
            });
        });
    };

    const deleteEvent = () => {
        $('tbody tr').on('click', (e) => {
            if (e.target.value === "DELETE") {
                state.eventlist = state.eventlist.filter(
                    (ele) => {
                        +ele.id !== +e.currentTarget.id;
                    }
                );
                model.deleteEvent(e.currentTarget.id).then((response) => {
                    model.getEvents().then((data) => {
                        state.eventlist = data;
                    })
                });
            }
        });
    };

    const editEvent = () => {
        $('tbody tr').on("click", (e) => {
            if (e.target.value === 'EDIT') {
                e.target.innerHTML = "SAVE";

                const id = +e.currentTarget.id;
                //get event which will be edited from backend
                let curEvent;
                state.eventlist.forEach((ele) => {
                    if (+ele.id === id) curEvent = ele;
                });

                const row = e.currentTarget;
                const cols = row.querySelectorAll('td');
                const keys = Object.keys(curEvent);

                //edit 3 inputs
                for (let i = 0; i < 3; i++) {
                    let input = cols[i].querySelector("input");
                    input.disabled = false;

                    input.addEventListener("keyup", (e) => {
                        let k = keys[i];
                        if (i === 0) {
                            curEvent[k] = e.target.value;
                        } else {
                            let newdate = new Date(e.target.value);
                            curEvent[k] = newdate.getTime().toString();
                        }
                    });
                }

                const savebutton = cols[3].querySelector("button");
                savebutton.addEventListener("click", (e) => {
                    model.editEvent(id, curEvent)
                        .then((response) => {
                            model.getEvents().then((data) => {
                                state.eventlist = data;
                            })
                        });
                });
            }
        });
    };

    const init = () => {
        model.getEvents().then((data) => {
            state.eventlist = data;

            addEvent();
            editEvent();
            deleteEvent();
        });
    };

    const bootstrap = () => {

        init();

    };
    return {
        bootstrap,

    };
})(Model, View);

Controller.bootstrap();
