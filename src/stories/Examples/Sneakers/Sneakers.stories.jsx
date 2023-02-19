import React from "react";

import { Sneakers } from "./Sneakers";

export default {
  title: "Examples/Sneakers",
  component: Sneakers,
};

const SneakersLate = () => <Sneakers />;
export const SneakersLates = SneakersLate.bind({});
