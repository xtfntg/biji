import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const Annotations = () => {
  const style = {
    cursor: "pointer",
    outline: "none",
    border: "none",
    fontSize: " 8px",
    fontWeight: "300",
    background: "black",
    padding: " 2px 10px",
    borderRadius: "20px",
    letterSpacing: "1px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    color: "#fff",
  };
  return (
    <Html>
      <div style={style}>
        画布显示<span style={{ fontSize: "1.5em" }}>🥲</span>
      </div>
    </Html>
  );
};

const Box = () => {
  return (
    <mesh position={[2, 0, 0]}>
      <boxGeometry />
      <meshStandardMaterial color="#987" />
      <Annotations />
    </mesh>
  );
};

const Dodecahedron = () => {
  return (
    <mesh position={[-2, 0, 0]}>
      <dodecahedronGeometry />
      <meshStandardMaterial color={"#143"} />
      <Html distanceFactor={5}>
        <div color={"#fff"}>跟踪物体旋转</div>
      </Html>
    </mesh>
  );
};

export const CardHtml = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#151520" };
  return (
    <Canvas style={style}>
      <pointLight color="indianred" />
      <pointLight intensity={5} position={[10, 10, -10]} color="orange" />
      <pointLight intensity={5} position={[-10, -10, 10]} color="lightblue" />
      <Box />
      <Dodecahedron />
      <OrbitControls />
    </Canvas>
  );
};
