import React from "react";

import { EventNesting } from "./04EventNesting";

export default {
  title: "Event/EventNesting",
  component: EventNesting,
};

const EventNestingLate = () => <EventNesting />;
export const EventNestingLates = EventNestingLate.bind({});
