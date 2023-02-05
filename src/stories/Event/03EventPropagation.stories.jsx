import React from "react";
import { EventPropagation } from "./03EventPropagation";

export default {
  title: "Event/EventPropagation",
  component: EventPropagation,
};

const EventPropagationLate = () => <EventPropagation />;
export const EventPropagationLates = EventPropagationLate.bind({});
