import React from "react";
import { FrameHook } from "./04FrameHook";

export default {
  title: "PropsHook/Frame",
  comppnent: FrameHook,
};
const FrameHookLate = () => <FrameHook />;
export const FrameHooks = FrameHookLate.bind({});
