import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const LoadModelImport = () => {
  const model = useGLTF("./Boy.glb");
  return <primitive object={model.scene} />;
};

export const ModelImport = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#020",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [10, 10, 15] }} shadows>
      <ambientLight intensity={1} />
      <LoadModelImport />
      <OrbitControls />
    </Canvas>
  );
};
