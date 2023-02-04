import React from "react";
import { UseMemoHook } from "./06UseMemoHook";

export default {
  title: "PropsHook/UseMemo",
  comppnent: UseMemoHook,
};
const UseMemoHookLate = () => <UseMemoHook />;
export const UseMemoHooks = UseMemoHookLate.bind({});
