const Appapi = (() => {
    baseurl = "https://jsonplaceholder.typicode.com";
    path = "todos";

    const getTodos = () =>
        fetch([baseurl, path].join("/")).then((response) => response.json());

    const deleteTodo = id =>
        fetch([baseurl, path, id].join("/"), {
            method: "DELETE",
        });

    return {
        deleteTodo,
        getTodos,
    };
})();

// ~~~~~~~~~~~~~~~view~~~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domstr = {
        todolist: "#todolist__container",
        deletebtn: ".delete_btn",
    };
    const render = (element, tmp) => {
        element.innerHTML = tmp;
    };
    const createTmp = (arr) => {
        let tmp = "";
        arr.forEach((ele) => {
            tmp += `
                <li>
                    <span>${ele.title}</span>
                    <button class="delete_btn" id="${ele.id}">
                        X
                    </button>
                </li>
            `;
        });
        return tmp;
    };

    return {
        domstr,
        render,
        createTmp,
    };
})();

// ~~~~~~~~~~~~~~~model~~~~~~~~~~~~~~~~~~~~~
const Model = ((api, view) => {
    class Todo {
        constructor(userId, id, title, completed) {
            this.userId = userId;
            this.id = id;
            this.title = title;
            this.completed = completed;
        }
    }

    class State {
        #todolist = [];

        get todolist() {
            return this.#todolist;
        }

        set todolist(newdata) {
            this.#todolist = newdata;

            const ele = document.querySelector(view.domstr.todolist);
            const tmp = view.createTmp(this.#todolist);
            view.render(ele, tmp);

            const deletebtns = document.querySelectorAll(view.domstr.deletebtn);
            deletebtns.forEach((btn) => {
                btn.addEventListener("click", (event) => {
                    this.todolist = this.#todolist.filter(
                        (todo) => +todo.id !== +event.target.id
                    );
                    api.deleteTodo(id);
                });
            });
        }
    }

    const deleteTodo = api.deleteTodo;
    const getTodos = api.getTodos;

    return {
        Todo,
        State,
        getTodos,
        deleteTodo
    };
})(Appapi, View);

// ~~~~~~~~~~~~~~~controller~~~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
    const state = new model.State();

    const init = () => {
        model.getTodos().then((data) => {
            state.todolist = data;
        });
    };

    return { init };
})(Model, View);

Controller.init();
