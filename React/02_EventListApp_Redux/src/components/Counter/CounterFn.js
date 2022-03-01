import { useState } from "react";

import { useMySelector, useMyDispatch } from "../../MyReactRedux/MyReactRedux";

const CounterFn = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState("Counter Fn");
  // const [counter, setCounter] = useState(0);

  const count = useMySelector((state) => state.value);
  const dispatch = useMyDispatch();

  const handleOnClick = () => {
    // setCounter(counter + 1);
    dispatch({ type: "counter/incremented" });
  };

  return (
    <section>
      <header>{title}</header>
      <p>{count}</p>
      <button onClick={handleOnClick}>Add</button>
    </section>
  );
};

export default CounterFn;
