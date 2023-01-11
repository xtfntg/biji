import React from "react";
import { AnimationControl } from "./AnimationControl";

export default {
  title: "Control/AnimationControl",
  comment: AnimationControl,
};

const AnimationControlLate = (args) => <AnimationControl {...args} />;
export const AnimationControlLates = AnimationControlLate.bind({});
