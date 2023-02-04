import React from "react";
import { ObjectControls } from "./03ObjectControls";

export default {
  title: "Basis/ObjectControls",
  component: ObjectControls,
  //选择控制类型
  argTypes: {
    boxReceiveShadow: { control: "boolean" },
    boxCastShadow: { control: "boolean" },
    active: { control: "boolean" },
    even: { control: { type: "number", min: 1, max: 30, step: 2 } },
    //2.3添加环境光强度控制条，

    //1.3设置锚点组件x,y,z轴，控制样式条 类型范围 最小1 最大5 每次调整的值
    anchorX: { control: { type: "range", min: 1, max: 5, step: 1 } },
    anchorY: { control: { type: "range", min: 1, max: 5, step: 1 } },
    anchorZ: { control: { type: "range", min: 1, max: 5, step: 1 } },
    user: { control: "object" },
    odd: { control: "object" },
    avatar: { control: { type: "file", accept: ".png" } },
    contact1: { control: "radio", options: ["email", "phone", "mail"] },
    contact2: { control: "inline-radio", options: ["email", "phone", "mail"] },
    contact3: {
      control: "check",
      options: ["email", "phone", "mail"],
    },
    contact4: { control: "inline-check", options: ["email", "phone", "mail"] },
    age: { control: "select", options: [20, 30, 40, 50] },
    countries: {
      control: "multi-select",
      options: ["USA", "Canada", "Mexico"],
    },
    label: { control: "text" },
    color: { control: { type: "color", presetColors: ["red", "green"] } },
    startDate: { control: "date" },
  },
};

const ObjectControlsLate = ({
  //1.4引用锚点组件中的值
  boxReceiveShadow,
  boxCastShadow,
  args,
}) => (
  <ObjectControls
    //1.5锚点 正方形X,Y,Z控制
    boxReceiveShadow={boxReceiveShadow}
    boxCastShadow={boxCastShadow}
    {...args}
  />
);

export const ObjectControlss = ObjectControlsLate.bind({});
//参数
/* ObjectControlsLates.args = {
  children: "Heading(default)",
};
 */
