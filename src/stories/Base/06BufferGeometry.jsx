import React from "react";
import { Canvas } from "@react-three/fiber";

export const BufferGeometry = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style}>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </Canvas>
  );
};
