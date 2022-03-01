import { useEffect, useRef } from "react";

export const useAbort = () => {
  const controllerListRef = useRef([]);

  const createSignal = () => {
    const controller = new AbortController();

    controllerListRef.current.push(controller);

    return controller.signal;
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      controllerListRef.current.forEach((c) => {
        // console.log("cancelAPI call");
        c.abort();
      });
    };
  }, []);

  return {
    createSignal,
  };
};
