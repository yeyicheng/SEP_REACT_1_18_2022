import React from 'react';

export default class Counter extends React.Component {
  state = {
    title: 'Counter Class ',
    counter: 0,
  };

  handleClick = () => {
    this.setState({ counter: this.state.counter + 1 });
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
        <p>Counter: {this.state.counter}</p>
        <button onClick={this.handleClick}>Add</button>
        <button onClick={this.handleAlert}>AlertCounter After 5s</button>
      </section>
    );
  }
}
