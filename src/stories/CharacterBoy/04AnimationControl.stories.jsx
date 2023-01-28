import React from "react";
import { AnimationControl } from "./04AnimationControl";

export default {
  title: "CharacterBoy/AnimationControl",
  comment: AnimationControl,
};

const AnimationControlLate = (args) => <AnimationControl {...args} />;
export const AnimationControlLates = AnimationControlLate.bind({});
