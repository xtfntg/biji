import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Tree = () => {
  const model = useLoader(GLTFLoader, "/Tree.glb");
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "red",
  };
  return (
    <Canvas style={style} camera={{ fov: 23, position: [0, 100, -80] }}>
      <ambientLight intensity={10} />
      <spotLight
        castShadow
        intensity={10}
        angle={0.1}
        position={[-200, 220, -100]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.000001}
      />
      <object3D>
        <primitive object={model.scene.clone()} />
      </object3D>
      <OrbitControls />
    </Canvas>
  );
};
