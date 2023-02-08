import React from "react";
import { House } from "./01House";

export default {
  title: "Examples/House",
  component: House,
};

const HouseLate = () => <House />;
export const HouseLates = HouseLate.bind({});
