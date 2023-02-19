import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useSphere, useBox } from "@react-three/cannon";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const positions = [
  [0, 2, 3],
  [-1, 5, 16],
  [-2, 5, -10],
  [0, 12, 3],
  [-10, 5, 16],
  [8, 5, -10],
];

function Marble() {
  const [ref] = useSphere(() => ({
    mass: 10,
    position: [2, 5, 0],
  }));
  return (
    <mesh castShadow ref={ref}>
      <sphereBufferGeometry
        attach="geometry"
        args={[1, 32, 32]}
      ></sphereBufferGeometry>
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function Box({ position }) {
  const [ref] = useBox(() => ({
    mass: 1,
    position,
    args: [2, 2, 2],
  }));
  return (
    <mesh castShadow position={position} ref={ref}>
      <boxGeometry attach="geometry" args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

const Plane = () => {
  const [ref, api] = usePlane(() => ({
    //概率质量函数
    mass: 1,
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    type: "Static",
  }));
  useFrame(({ mouse }) => {
    api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x, 0);
  });
  return (
    <mesh scale={200} rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={ref}>
      <planeBufferGeometry />
      <meshStandardMaterial color="white" side={THREE.DoubleSide} />
    </mesh>
  );
};

export function Cannon() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#eaad1a",
  };
  return (
    <>
      <Canvas style={style} camera={{ position: [0, 20, 0], fov: 90 }} shadows>
        <color attach="background" args={["#94ebd8"]} />
        <fog attach="fog" args={["#94ebd8", 0, 40]} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.8} castShadow />
        <pointLight
          position={[-1, 3, 1]}
          intensity={3}
          castShadow
          args={[0xff0000, 1, 100]}
        />
        <spotLight
          castShadow
          intensity={1}
          args={["blue", 1, 100]}
          position={[-1, 4, 1]}
          penumbra={1}
        />
        <Physics>
          <Marble />
          <Plane />
          {positions.map((position, idx) => (
            <Box key={idx} position={position} />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
    </>
  );
}
