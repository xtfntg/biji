import React from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

const LoadModel = () => {
  const model = useGLTF("./ModelBox.glb");
  return <primitive object={model.scene} />;
};

export const ModelBox = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#00c89c" };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [-10, 50, 0] }} shadows>
      <ambientLight intensity={1} />
      <LoadModel />
      <OrbitControls />
    </Canvas>
  );
};
