import React from "react";

import { PositionalAudio } from "./04PositionalAudio.jsx";

export default {
  title: "Media/PositionalAudio",
  component: PositionalAudio,
};

const PositionalAudioLate = () => <PositionalAudio />;
export const PositionalAudioLates = PositionalAudioLate.bind({});
