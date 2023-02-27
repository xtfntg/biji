import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox } from "@react-three/cannon";

const Plane = (props) => {
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef());
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  );
};

const Box = (props) => {
  const [ref, api] = useBox(
    () => ({ args: [1, 1, 1], mass: 1, ...props }),
    useRef()
  );
  return (
    <mesh
      ref={ref}
      castShadow
      position={[0, 0.5, 0]}
      onPointerDown={() => api.velocity.set(0, 5, 0)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
};

export const CammonMesh = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas style={style} shadows camera={{ position: [0, 2, 4] }}>
      <spotLight
        position={[2.5, 5, 5]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      />
      <Physics>
        <Debug>
          <Plane rotation={[-Math.PI / 2, 0, 0]} />
          <Box />
        </Debug>
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};
