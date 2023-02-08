import React from "react";
import { Mouse } from "./05Mouse";

export default {
  title: "Event/Mouse",
  component: Mouse,
};

const MouseLate = () => <Mouse />;
export const MouseLates = MouseLate.bind({});
