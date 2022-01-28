export const Appapi = (() => {
    // baseurl = "https://jsonplaceholder.typicode.com";
    const baseurl = 'http://localhost:3000';
    const path = "todos";

    const getTodos = () =>
        fetch([baseurl, path].join("/")).then((response) => response.json());

    const addTodo = (todo) =>
        fetch([baseurl, path].join("/"), {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json());

    const deleteTodo = (id) =>
        fetch([baseurl, path, id].join("/"), {
            method: "DELETE",
        });

    return {
        deleteTodo,
        getTodos,
        addTodo,
    };
})();