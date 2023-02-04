import React from "react";
import { CameraGesture } from "./01CameraGesture";

export default {
  title: "Cameras/CameraGesture",
  component: CameraGesture,
};

const CameraGestureLate = (args) => <CameraGesture {...args} />;

export const CameraGestures = CameraGestureLate.bind({});
