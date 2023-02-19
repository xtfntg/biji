import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PlaneGeometry, Vector3 } from "three";

function Box(props) {
  const { viewport } = useThree();
  const ref = useRef();
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });
  return (
    <mesh ref={ref} {...props}>
      <sphereBufferGeometry args={[0.1, 16, 16]} />
      <meshPhysicalMaterial color="hotpink" />
    </mesh>
  );
}

function Plane(props) {
  return (
    <mesh rotation={[-Math.PI / 1, 0, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color={"#fff200"} wireframe />
    </mesh>
  );
}

function Lighting() {
  return (
    <group>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} />
      <pointLight position={[-2, 2, 2]} />
    </group>
  );
}

export function SceneEvent() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#0E0E0E",
  };
  return (
    <Canvas style={style}>
      <Lighting />
      <Plane />
      <Box />
    </Canvas>
  );
}
