import React from "react";
export const MyReactReduxContext = React.createContext(null);

export const myConnect = function (mapStateToPropsFn, mapDispatchToPropsFn) {
  return function (WrappedComponent) {
    return class NewComponent extends React.Component {
      static contextType = MyReactReduxContext;

      componentDidMount() {
        const { subscribe } = this.context;
        this.unsubscribe = subscribe(() => {
          console.log("add sub", this);
          this.forceUpdate();
        });
      }

      componentWillUnmount() {
        console.log("will unmount");
        this.unsubscribe();
      }

      render() {
        const { getState, dispatch } = this.context;
        const mapStateToProps = mapStateToPropsFn(getState());

        const mapDispatchToProps = mapDispatchToPropsFn(dispatch);
        const { children, ...rest } = this.props;

        return (
          <WrappedComponent
            {...mapStateToProps}
            {...mapDispatchToProps}
            {...rest}
    />
        );
      }
    };
  };
};

const useForceUpdate = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, forceUdpate] = React.useState(false);
  return () => forceUdpate((pre) => !pre);
};

const useSubscribe = (store) => {
  const forceUpdate = useForceUpdate();
  React.useEffect(() => {
    const unsubscribe = store.subscribe(forceUpdate);
    return () => {
      unsubscribe();
    };
  }, []);
};

export const useMySelector = (selectFn) => {
  const store = React.useContext(MyReactReduxContext);
  useSubscribe(store);
  return selectFn(store.getState());
};

export const useMyDispatch = () => {
  const store = React.useContext(MyReactReduxContext);
  useSubscribe(store);
  return store.dispatch;
};

export const MyProvider = ({ children, store }) => {
  return (
    <MyReactReduxContext.Provider value={store}>
      {children}
    </MyReactReduxContext.Provider>
  );
};
