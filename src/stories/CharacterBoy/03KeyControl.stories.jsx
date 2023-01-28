import React from "react";
import { KeyControl } from "./03KeyControl";

export default {
  title: "CharacterBoy/KeyControl",
  component: KeyControl,
  parameters: {
    layout: "fullscreen",
  },
};

const KeyControlWASD = (args) => <KeyControl {...args} />;
export const KeyControlWASDs = KeyControlWASD.bind({});
