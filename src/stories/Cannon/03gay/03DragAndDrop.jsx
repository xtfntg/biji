import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { Cursor } from "./03Drag";
import { Table, Sphere } from "./03Fumiture";

const Floor = (props) => {
  const [ref] = usePlane(() => ({ type: "static", ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <MeshReflectorMaterial
        color="#878790"
        blur={[400, 400]}
        resolution={1024}
        mixBlur={1}
        mixStrength={3}
        depthScale={1}
        minDepthThreshold={0.85}
        metalness={0}
        roughness={1}
      />
    </mesh>
  );
};

const Box = () => {
  return (
    <mesh position={[5, -3.5, 15]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshBasicMaterial />
    </mesh>
  );
};

export const DragAndDrop = () => {
  const style = { width: "600px", height: "400px" };
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      style={style}
      camera={{ position: [0, 0, 40], fov: 25, near: 1, far: 100 }}
    >
      <color attach="background" args={["#171720"]} />
      <fog attach="fog" args={["#171720", 60, 90]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[-20, -5, -20]} color="red" />
      <Physics allowSleep={false} iterations={15} gravity={[0, -200, 0]}>
        <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Cursor />
        <Table />
        <Box />
        <Sphere />
      </Physics>
    </Canvas>
  );
};
