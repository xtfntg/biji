import React, { useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, Loader, useTexture, useGLTF } from "@react-three/drei";
import "./Kepler.scss";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import styled from "styled-components";
import { TopSection } from "./TopSection";

function Sphere() {
  const cloudsRef = useRef();
  const earthRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    earthRef.current.rotation.y = elapsedTime / 12;
    cloudsRef.current.rotation.y = elapsedTime / 12;
  });

  const [clicked, useclicked] = useState(false);

  const [B2Texture, Texture] = useTexture([
    "/assets/8k_earth_nightmap.jpg",
    "/assets/8k_earth_specular_map.jpg",
  ]);

  return (
    <>
      <mesh
        position={[-30, 5, -10]}
        ref={cloudsRef}
        scale={clicked ? 5 : 1}
        onClick={(e) => {
          useclicked(!clicked);
        }}
      >
        <sphereBufferGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={B2Texture} />
      </mesh>

      <mesh position={[3, -4, 0]} ref={earthRef} scale={[10, 10, 10]}>
        <sphereBufferGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={Texture} />
      </mesh>
    </>
  );
}

function Box(props) {
  return (
    <mesh position={[-2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
}
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
export function Kepler() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#8b614d",
  };
  return (
    <Wrapper>
      <TopSection />
      <Canvas
        style={style}
        camera={{ fov: 100, near: 0.1, far: 1000, position: [0, 0, 10] }}
      >
        <pointLight color="#f6f3ea" position={[12, 0, 15]} intensity={10} />
        <Box />
        <Sphere />
        {/* <OrbitControls /> */}
      </Canvas>
    </Wrapper>
  );
}
