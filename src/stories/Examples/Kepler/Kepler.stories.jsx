import React from "react";
import { Kepler } from "./Kepler";

export default {
  title: "Examples/Kepler",
  component: Kepler,
};

const KeplerLate = () => <Kepler />;
export const KeplerLates = KeplerLate.bind({});
