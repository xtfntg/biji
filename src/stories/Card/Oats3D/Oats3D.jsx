import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Html,
  useProgress,
} from "@react-three/drei";
import { Shoe3D } from "./Shoe3D";

const Loader = () => {
  const { progress } = useProgress();
  return <Html center>{progress}%loaded</Html>;
};

export const Oats3D = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#d8e3e7" };
  return (
    <Canvas style={style} shadows camera={{ position: [2.25, 1, 10] }}>
      <Suspense fallback={<Loader />}>
        <Environment
          preset="dawn"
          background
          ground={{
            height: 2,
            radius: 115,
            scale: 100,
          }}
        />
        <directionalLight
          position={[5, 1.5, 3]}
          intensity={2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />

        <Shoe3D />
        <OrbitControls
          target={[1.5, 0.8, 1.5]}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 + Math.PI / 12}
        />
      </Suspense>
    </Canvas>
  );
};
