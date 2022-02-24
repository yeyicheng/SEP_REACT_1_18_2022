import React, {useEffect, useState} from 'react';
import {store} from "../../redux/store";

class EventCounter extends React.Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  render(){
    return <h1>{store.getState()['value']}</h1>;
  }
}

export default EventCounter;
