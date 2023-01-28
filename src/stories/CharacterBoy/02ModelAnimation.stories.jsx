import React from "react";
import { ModelAnimation } from "./02ModelAnimation";

export default {
  title: "CharacterBoy/ModelAnimation",
  component: ModelAnimation,
};

const ModelAnimationLate = (args) => <ModelAnimation {...args} />;

export const ModelAnimationLates = ModelAnimationLate.bind({});
