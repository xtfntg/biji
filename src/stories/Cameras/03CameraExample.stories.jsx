import React from "react";
import { CameraExample } from "./03CameraExample";

export default {
  title: "Cameras/CameraExample",
  component: CameraExample,
};

const CameraExampleLate = () => <CameraExample />;
export const CameraExampleLates = CameraExampleLate.bind({});
