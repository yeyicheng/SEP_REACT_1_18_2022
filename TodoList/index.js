const Appapi = (() => {

    baseurl = 'https://jsonplaceholder.typicode.com';
    path = 'todos';

    const getTodos = () =>
        fetch([baseurl, path].join('/'))
            .then((response) => response.json());

    return {
        getTodos,
    };
})();

// ~~~~~~~~~~~~~~~view~~~~~~~~~~~~~~~~~~~~~
const View = (() => {
    const domstr = {
        todolist: '#todolist__container'
    }
    const render = (element, tmp) => {
        element.innerHTML = tmp;
    }
    const createTmp = arr => {
        let tmp = '';
        arr.forEach(ele => {
            tmp += `
                <li>
                    <span>${ele.title}</span>
                    <button>X</button>
                </li>
            `;
        });
        return tmp;
    }

    return {
        domstr,
        render,
        createTmp
    };
})();

// ~~~~~~~~~~~~~~~model~~~~~~~~~~~~~~~~~~~~~
const Model = ((api) => {


    const getTodos = api.getTodos;

    return {
        getTodos
    };
})(Appapi);
// ~~~~~~~~~~~~~~~controller~~~~~~~~~~~~~~~~~~~~~
const Controller = ((model, view) => {

    const init = () => {
        model.getTodos().then(data => {
            const ele = document.querySelector(view.domstr.todolist);
            const tmp = view.createTmp(data);

            view.render(ele, tmp);
        });
    }


    return { init };
})(Model, View);

Controller.init();