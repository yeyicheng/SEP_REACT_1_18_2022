import React from "react";

class WithAbort extends React.Component {
  constructor(props) {
    super(props);

    this.controllerList = [];
  }

  componentWillUnmount() {
    this.controllerList.forEach((c) => {
      console.log("cancelAPI call");
      c.abort();
    });
  }

  createSignal = () => {
    const controller = new AbortController();

    this.controllerList.push(controller);
    return controller.signal;
  };

  render() {
    return this.props.renderChildren(this.createSignal);
  }
}

export default WithAbort;
