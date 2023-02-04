import React from "react";
import { LightControls } from "./01LightControls";

/* export default {
  title: "Basis/AddControls",
  component: AddControls,
  //参数类型
  argTypes: {
    level: { control: "radio" },
    children: { control: "text" },
  },
}; */

export default {
  title: "Basis/LightControls",
  component: LightControls,
  //选择控制类型
  argTypes: {
    active: { control: "boolean" },
    even: { control: { type: "number", min: 1, max: 30, step: 2 } },
    //2.3添加环境光强度控制条，
    ambientLightIntensity: {
      control: { type: "range", min: 0.1, max: 10, step: 0.2 },
    },
    directionalLightIntensity: {
      control: { type: "range", min: 0.1, max: 10, step: 0.2 },
    },
    pointLightIntensity: {
      control: { type: "range", min: 0.1, max: 5, step: 0.2 },
    },
    pointLightcolor: {
      control: { type: "color", presetColors: ["#20894d", "#7e1671"] },
    },

    //1.3设置锚点组件x,y,z轴，控制样式条 类型范围 最小1 最大5 每次调整的值
  },
};

const LightControlsLate = ({
  //2.4引用环境光强度
  ambientLightIntensity,
  directionalLightIntensity,
  pointLightIntensity,
  pointLightcolor,
  drawBoundingBox,
  args,
}) => (
  <LightControls
    ambientLightIntensity={ambientLightIntensity}
    directionalLightIntensity={directionalLightIntensity}
    pointLightIntensity={pointLightIntensity}
    pointLightcolor={pointLightcolor}
    //1.5锚点 正方形X,Y,Z控制
    drawBoundingBox={drawBoundingBox}
    {...args}
  />
);

export const LightControlsLates = LightControlsLate.bind({});
//参数
/* LightControlsLates.args = {
  children: "Heading(default)",
};
 */
