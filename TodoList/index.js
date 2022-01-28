import { Appapi } from "./api.js";

// ~~~~~~~~~~~~~~~view~~~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domstr = {
        todolist: "#todolist__container",
        deletebtn: ".delete_btn",
        inputbox: ".todolist__input",
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
        constructor(title) {
            this.userId = 20;
            this.title = title;
            this.completed = false;
        }
    }

    class State {
        #todolist = [];

        get todolist() {
            return this.#todolist;
        }

        set todolist(newdata) {
            this.#todolist = newdata;

            // render the todolist
            const ele = document.querySelector(view.domstr.todolist);
            const tmp = view.createTmp(this.#todolist);
            view.render(ele, tmp);

            // get all delete btns
            // add eventlistener to each btn
            // this.todolist = this.#todolist.filter((todo) => {
            //     return +todo.id !== +event.target.id;
            // });
        }
    }

    const deleteTodo = api.deleteTodo;
    const getTodos = api.getTodos;
    const addTodo = api.addTodo;

    return {
        Todo,
        State,
        addTodo,
        getTodos,
        deleteTodo,
    };
})(Appapi, View);

// ~~~~~~~~~~~~~~~controller~~~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {
    const state = new model.State();

    const addTodo = () => {
        const inputbox = document.querySelector(view.domstr.inputbox);

        inputbox.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const todo = new model.Todo(event.target.value);
                model.addTodo(todo).then(newtodo => {
                    state.todolist = [newtodo, ...state.todolist];
                    event.target.value = '';
                });
            }
        });
    };

    const deletTodo = () => {
        const ele = document.querySelector(view.domstr.todolist);
        ele.addEventListener("click", (event) => {
            state.todolist = state.todolist.filter((todo) => {
                return +todo.id !== +event.target.id;
            });
            model.deleteTodo(event.target.id);
        });
    };

    const init = () => {
        model.getTodos().then((data) => {
            state.todolist = data;
        });
    };

    const bootstrap = () => {
        init();
        deletTodo();
        addTodo();
    };

    return { bootstrap };
})(Model, View);

Controller.bootstrap();
