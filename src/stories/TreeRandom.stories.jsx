import React from "react";
import { TreeRandoms } from "./TreeRandom";

export default {
  title: "Tree/TreeRandoms",
  component: TreeRandoms,
};

const TreelateRandom = (args) => <TreeRandoms {...args} />;
export const TreelatesRandom = TreelateRandom.bind({});

TreelatesRandom.args = {
  user: {
    name: "treeRandom",
  },
};
