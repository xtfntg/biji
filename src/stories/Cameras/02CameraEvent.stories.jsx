import React from "react";
import { CameraEvent } from "./02CameraEvent";

export default {
  title: "Cameras/CameraEvent",
  component: CameraEvent,
};

const CameraEventLate = (args) => <CameraEvent {...args} />;

export const CameraEvents = CameraEventLate.bind({});
