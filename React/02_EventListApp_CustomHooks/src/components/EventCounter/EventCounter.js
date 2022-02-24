import React from 'react';
import { withEventData } from '../../hoc/withEventData';
class EventCounter extends React.Component {
  render() {
    const { events } = this.props;
    return <h1>{events.length}</h1>;
  }
}

const EventCounterConnector = withEventData(EventCounter);

export default EventCounterConnector;
