import React from "react";

import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

export default {
  component: TaskList,
  title: "case/TaskList",
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
};

const Template = (args) => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
  // 通过 args 组合塑造故事。
  // 数据继承自 Task.stories.js 中的默认故事。
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" },
  ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // 通过 args 组合塑造故事。
  // 来自默认故事的继承数据。
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // 通过 args 组合塑造故事。
  // 来自 Loading 故事的继承数据。
  ...Loading.args,
  loading: false,
};
