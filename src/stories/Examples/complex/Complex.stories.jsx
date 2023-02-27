import React from "react";

import { Complex } from "./Complex";

export default {
  title: "Examples/Complex",
  component: Complex,
};

const ComplexLate = () => <Complex />;
export const ComplexLates = ComplexLate.bind({});
