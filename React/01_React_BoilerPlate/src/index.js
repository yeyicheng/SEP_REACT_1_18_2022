import Logo from './Logo';
import React from 'react';
import ReactDOM from 'react-dom';
import "./style.scss";
import PropTypes from 'prop-types';

class HelloMessage extends React.Component {
  state = { name: 'Yicheng Ye' };
  render() {
    return (
      <div>
        <Logo></Logo> Hello {this.props.name} From {this.state.name}
      </div>
    );
  }
}

HelloMessage.propTypes = {
  name: PropTypes.string.isRequired
};

ReactDOM.render(
  <HelloMessage name="Patrick" />,
  document.getElementById('hello-example')
);
