import React from "react";
import { LoadingPage } from "./LoadingPage";

export default {
  title: "Examples/LoadingPage",
  component: LoadingPage,
};

const LoadingPageLate = () => <LoadingPage />;
export const LoadingPageLates = LoadingPageLate.bind({});
