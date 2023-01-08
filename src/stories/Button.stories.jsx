import React from "react";
import { Button } from "./Button";

export default {
  title: "case/Button",
  component: Button,
  argTypes: {
    variant: {
      control: {
        defaultValue: "primary",
        type: "select",
        values: ["primary", "secondary", "outline"],
      },
    },
  },
};

const ButtonLate = (args) => <Button {...args}>fdsff</Button>;
export const Buttonlates = ButtonLate.bind({});
