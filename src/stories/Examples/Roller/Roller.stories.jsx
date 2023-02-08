import React from "react";

import { Roller } from "./Roller";

export default {
  title: "Examples/Roller",
  component: Roller,
};

const RollerLate = () => <Roller />;
export const RollerLates = RollerLate.bind({});
