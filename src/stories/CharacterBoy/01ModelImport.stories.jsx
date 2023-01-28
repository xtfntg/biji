import React from "react";
import { ModelImport } from "./01ModelImport";

export default {
  title: "CharacterBoy/modelImport",
  component: ModelImport,
};

const ButtonLate = (args) => <ModelImport {...args} />;
export const Buttonlates = ButtonLate.bind({});
