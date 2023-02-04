import React from "react";
import { CustomHook } from "./07CustomHook";

export default {
  title: "PropsHook/CustomHook",
  comppnent: CustomHook,
};
const CustomHookLate = () => <CustomHook />;
export const CustomHooks = CustomHookLate.bind({});
