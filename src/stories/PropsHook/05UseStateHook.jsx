import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

const HtmlContent = () => {
  const style = {
    height: "50px",
    padding: "3px",
    /*  borderRadius: "3px", */
    fontSize: "10px",
    border: "1px solid #888888",
    backgroundColor: "#36292f",
    color: "#f97d1c",
    lineHeight: "20px",
  };
  return (
    <Html style={style} fullscreen={true}>
      <p>
        <span>注:使用状态钩子 </span>
        <br />
        <span>
          步骤: 🤸1加载useState🤸2使用状态 之前状态 变化后的状态 状态(条件)
          🤸3.判断要变化的状态
        </span>
      </p>
      <br />
    </Html>
  );
};

const Box = (props) => {
  const ref = useRef(0);
  //1.1使用装态钩子let color = 'red',color = 'green'是这个思路
  const [hovered, setHovered] = useState(false);
  const [rotate, setRotate] = useState(false);
  useFrame((_, delta) => {
    //1.3判断状态
    if (!rotate) {
      ref.current.rotation.x += 0.5 * delta;
      ref.current.rotation.y += 0.5 * delta;
    }
  });
  return (
    <mesh
      {...props}
      ref={ref}
      //1.5添加状态判断
      scale={hovered ? [1, 1, 1] : [1.5, 1.5, 1.5]} //1.2添加比例判断指针按下 停止转动      onPointerDown={() => setRotate(!rotate)}
      //1.3指针移入
      onPointerOver={() => setHovered(true)}
      //1.4指针移出
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      {/* 1.5添加色彩判断 */}
      <meshMatcapMaterial color={hovered ? "#126bae" : "#83cbac"} />
    </mesh>
  );
};

export const UseStateHook = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#856d72",
  };
  return (
    <Canvas
      style={style}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }}
    >
      <HtmlContent />
      <Box position={[-2, 0, 0]} scale={[1, 1, 1]} />
      <Box position={[2, 0, 0]} scale={[1, 1, 1]} />
      <OrbitControls />
    </Canvas>
  );
};
