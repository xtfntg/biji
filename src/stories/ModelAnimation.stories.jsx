import React from "react";
import { ModelAnimation } from "./ModelAnimation";

export default {
  title: "ModelLoad/ModelAnimation",
  component: ModelAnimation,
};

const ModelAnimationLate = (args) => <ModelAnimation {...args} />;

export const ModelAnimationLates = ModelAnimationLate.bind({});
