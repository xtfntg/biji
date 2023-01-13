import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

const LoadModelAnimation = () => {
  const model = useGLTF("./BoyAnimation.glb");
  /* console.log(model); */
  const { actions } = useAnimations(model.animations, model.scene);
  useEffect(() => {
    actions?.Walking?.play();
  }, []);
  return <primitive object={model.scene} />;
};

export const ModelAnimation = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#020",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [10, 10, 15] }} shadows>
      <ambientLight intensity={1} />
      <LoadModelAnimation />
      <OrbitControls />
    </Canvas>
  );
};
