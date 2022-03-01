import React from "react";
import { myConnect } from "../../MyReactRedux/MyReactRedux";

class Counter extends React.Component {
  state = {
    title: "Counter Class",
    counter: 0,
  };

  handleOnClick = () => {
    // this.setState({ counter: this.state.counter + 1 });
    this.props.add();
  };

  handleAlert = () => {
    setTimeout(() => {
      alert(this.state.counter);
    }, 5000);
  };

  render() {
    return (
      <section>
        <header>{this.state.title}</header>
        <p>Counter: {this.props.count}</p>
        <button onClick={this.handleOnClick}>Add</button>
        <button onClick={this.handleAlert}>Alert</button>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch({ type: "counter/incremented" });
    },
  };
};

export default myConnect(mapStateToProps, mapDispatchToProps)(Counter);

// export default Counter;
