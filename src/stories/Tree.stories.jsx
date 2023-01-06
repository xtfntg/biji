import React from "react";
import { Tree } from "./Tree";

export default {
  title: "case/Tree",
  component: Tree,
};

const Treelate = (args) => <Tree {...args} />;
export const Treelates = Treelate.bind({});

Treelates.args = {
  user: {
    name: "tree",
  },
};
