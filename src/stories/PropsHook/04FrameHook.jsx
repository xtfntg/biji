import React, { useRef } from "react";
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
        <span>注:加载渲染对象装态钩子 Three.js 渲染器</span>
        <br />
        <span>步骤: 🤸1加载useFrame🤸2加载渲染对象装态钩子</span>
      </p>
      <br />
    </Html>
  );
};

const Box = (props) => {
  const ref = useRef(0);
  //1.1Three.js 场景的一个对象 渲染对象装态钩子
  useFrame((_, delta) => {
    ref.current.rotation.x += 0.5 * delta;
    ref.current.rotation.y += 0.5 * delta;
  });
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshMatcapMaterial color={"#126bae"} />
    </mesh>
  );
};

export const FrameHook = () => {
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
      <Box position={[-1.5, 0, 0]} scale={[1, 1, 1]} />
      <Box position={[1.5, 0, 0]} scale={[1, 1, 1]} />
      <OrbitControls />
    </Canvas>
  );
};
