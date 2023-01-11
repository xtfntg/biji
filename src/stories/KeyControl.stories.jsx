import React from "react";
import { KeyControl } from "./KeyControl";

export default {
  title: "Control/KeyControl",
  component: KeyControl,
  parameters: {
    layout: "fullscreen",
  },
};

const KeyControlWASD = (args) => <KeyControl {...args} />;
export const KeyControlWASDs = KeyControlWASD.bind({});
