import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
//创业跟随环3.1
const Ring = () => {
  return (
    <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, 0.01, 0]}>
      <ringBufferGeometry args={[0.3, 0.36, 64]} />
      <meshBasicMaterial
        color={"#fff"}
        transparent={true}
        opacity={0.5}
        //visible={false}
        visible={true}
      />
    </mesh>
  );
};
//创建平面2.1
const FloorMesh = () => {
  return (
    <mesh rotation={[Math.PI / -2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={"#5555ff"} />
    </mesh>
  );
};
//创建平面木地板场景1.1
export const WoodenFloor = () => {
  const style = {
    width: "500px",
    height: "400px",
    backgroundColor: "#000",
  };
  return (
    <Canvas style={style} camera={{ fov: 75, position: [0, 1, 7] }} shadows>
      <ambientLight intensity={0.1} />
      <pointLight
        position={[0, 2, 0]}
        color={"#fff"}
        intensity={1}
        distance={100}
      />
      <FloorMesh />
      <Ring />
      <OrbitControls />
    </Canvas>
  );
};
