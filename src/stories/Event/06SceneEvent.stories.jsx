import React from "react";

import { SceneEvent } from "./06SceneEvent";

export default {
  title: "Event/SceneEvent",
  component: SceneEvent,
};

const SceneEventLate = () => <SceneEvent />;
export const SceneEventLates = SceneEventLate.bind({});
