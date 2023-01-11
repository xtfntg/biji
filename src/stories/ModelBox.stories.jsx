import React from "react";
import { ModelBox } from "./ModelBox";

export default {
  title: "ModelLoad/ModelBox",
  component: ModelBox,
};

const ModelBoxLate = (args) => <ModelBox {...args} />;

export const ModelBoxLates = ModelBoxLate.bind({});
