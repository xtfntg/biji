import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Mesh, Points } from "three";
import { OrbitControls, Stars } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
const Torusknot = () => {
  const mesh = useRef();

  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export const R3fModel = () => {
  const [hovered, hover] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered
      ? "pointer"
      : "url('https://raw.githubusercontent.com/chenglou/react-motion/master/demos/demo8-draggable-list/cursor.png') 10 10, auto";
  }, [hovered]);
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#59191F",
  };
  return (
    <Canvas style={style}>
      <pointLight position={[-10, -10, -10]} />
      <Torusknot />
      <OrbitControls />
      <Stars radius={500} depth={50} count={1000} factor={10} />
    </Canvas>
  );
};
