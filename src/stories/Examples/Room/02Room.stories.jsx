import React from "react";

import { Room } from "./02Room";

export default {
  title: "Examples/Room",
  component: Room,
};

const RoomLate = () => <Room />;
export const RoomLates = RoomLate.bind({});
