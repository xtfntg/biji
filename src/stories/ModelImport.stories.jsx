import React from "react";
import { ModelImport } from "./ModelImport";

export default {
  title: "ModelLoad/modelImport",
  component: ModelImport,
};

const ButtonLate = (args) => <ModelImport {...args} />;
export const Buttonlates = ButtonLate.bind({});
