import React from "react";
import { CarControl } from "./03CarControl";

export default {
  title: "RacingCar/CarControl",
  coment: CarControl,
};

const CarControlLate = (args) => <CarControl {...args} />;
export const SceneCarControl = CarControlLate.bind({});
