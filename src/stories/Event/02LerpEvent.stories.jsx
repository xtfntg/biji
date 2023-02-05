import React from "react";
import { LerpEvent } from "./02LerpEvent";

export default {
  title: "Event/LerpEvent",
  component: LerpEvent,
};

const LerpEventLate = () => <LerpEvent />;
export const LerpEventLates = LerpEventLate.bind({});
