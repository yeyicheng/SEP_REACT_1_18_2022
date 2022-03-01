import { createStore } from "redux";

import { eventDataReducer } from "../reducers/eventDataReducer";

const store = createStore(eventDataReducer);

export default store;
