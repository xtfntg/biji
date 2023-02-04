import React, { useRef, useEffect, useLayoutEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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
        <span>注:使用记忆钩子 之前电脑记算过的不用再次计算</span>
        <br />
        <span>步骤: 🤸1加载useMemo🤸2添加记忆钩子</span>
      </p>
      <br />
    </Html>
  );
};

const Box = (props) => {
  const ref = useRef(0);
  //1.1添加记忆钩子
  /* const geometry = new THREE.BoxGeometry(); */

  useEffect(() => {
    console.log(ref.current.geometry.uuid);
  });

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.5 * delta;
    ref.current.rotation.y += 0.5 * delta;
  });
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry />
      <meshMatcapMaterial color={"#ee4866"} />
    </mesh>
  );
};

export const UseMemoHook = () => {
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
