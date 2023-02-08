import React from "react";

import { FPSOctree } from "./FPSOctree";

export default {
  title: "Examples/FPSOctree",
  component: FPSOctree,
};

const FPSOctreeLate = () => <FPSOctree />;
export const FPSOctreeLates = FPSOctreeLate.bind({});
