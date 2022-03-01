import React, { useState } from "react";
import { useEventData } from "../../hooks/useEventData";

import EventDataRow from "../EventDataRow/EventDataRow";
import EventTable from "../EventTable/EventTable";

const UpComingEvent = () => {
  const { events } = useEventData();

  const [dataCol] = useState([
    "Event Name",
    "Start Date",
    "End Date",
  ]);

  const renderHeader = () => {
    return <h5>UpComingEvent</h5>;
  };

  return (
    <EventTable renderHeader={renderHeader} dataCol={dataCol}>
      {events
        ?.filter((event) => {
          if (event.isInTheFuture()) {
            return true;
          } else {
            return false;
          }
        })
        .map((event) => {
          return <EventDataRow key={event.id} event={event}></EventDataRow>;
        })}
    </EventTable>
  );
};
// HOC HELLO
// const UpComingEventPage =withScanData(withError(withUser(withEventData(UpComingEvent))));
// const UpComingEventPage = withEventData(UpComingEvent);

// const UpComingEventPage = () => {
//   return (
//     <WithEventData
//       renderChildren={(events) => {
//         return <UpComingEvent events={events} />;
//       }}
//     />
//   );
// };

// const UpComingEventPage = () => {
//   return (
//     <WithAbort
//       renderChildren={(createSignal) => {
//         return (
//           <WithEventData
//             createSignal={createSignal}
//             renderChildren={(events) => {
//               return <UpComingEvent events={events} />;
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

export default UpComingEvent;
