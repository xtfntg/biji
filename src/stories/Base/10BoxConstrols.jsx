import React from "react";
import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, TransformControls, useCursor } from "@react-three/drei";
import { useControls } from "leva";
import create from "zustand";

//声明 使用商店 = 创建(集合=>)
const useStore = create((set) => ({
  //目标:空
  target: null,
  //集合目标:目标=> 集合{目标}
  setTarget: (target) => set({ target }),
}));

function Box(props) {
  //活动对象 = 使用活动对象
  const ref = useRef();
  //声明 集合目标 = 使用商店(状态 = 状态.集合目标)
  const setTarget = useStore((state) => state.setTarget);
  //声明 [悬停, 集合悬停] = 使用状态(假)
  const [hovered, setHovered] = useState(false);
  //使用光标(悬停)
  useCursor(hovered);
  return (
    //网格 {道具} 活动对象={活动对象} 点击对象={(事件)=>集合目标(事件.对象)}
    <mesh {...props} ref={ref} onClick={(e) => setTarget(e.object)}>
      {/* 正方体 */}
      <boxGeometry />
      {/* 网格标准材质 */}
      <meshNormalMaterial />
    </mesh>
  );
}

export function BoxConstrols() {
  /* 声明 {目标,集合目标} = 使用商店*/
  const { target, setTarget } = useStore();
  /* 声明 {模式} = 使用控制*/
  const { mode } = useControls({
    /* 模式 {值：移动, } , 选项:[移动,旋转,比例]*/
    mode: { value: "translate", options: ["translate", "rotate", "scale"] },
  });
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#c6dfc8",
  };
  return (
    //设备像素比 指针未命中={设定目标}
    <Canvas style={style} dpr={[1, 2]} onPointerMissed={() => setTarget(null)}>
      {/* 定位 */}
      <Box position={[0, 0, 0]} />
      {/* 目标&&变换控件 对象={目标} 模式={模式}*/}
      {target && <TransformControls object={target} mode={mode} />}
      {/* 轨道控制 */}
      <OrbitControls makeDefault />
    </Canvas>
  );
}
