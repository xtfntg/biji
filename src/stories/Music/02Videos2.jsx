import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Environment, useAspect } from "@react-three/drei";

const Video2 = () => {
  const scale = useAspect(1920, 1080, 1);
  const [video1] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/drei.mp4",
      crossOrigin: "Anonymous",
      muted: true,
      loop: true,
    })
  );
  const [video2] = useState(() =>
    Object.assign(document.createElement("video"), {
      src: "/huaxei.mp4",
      crossOrigin: "Anonymous",
      muted: true,
      loop: true,
    })
  );
  useEffect(() => void video1.play(), [video1]);

  useEffect(() => void video2.play(), [video2]);
  return (
    <>
      <mesh position={[-0.5, 0, 0]}>
        <planeGeometry />
        <meshPhysicalMaterial
          toneMapped={false}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.FrontSide}
        >
          <videoTexture
            attach="map"
            args={[video1]}
            flipY={false}
            repeat={[-2, -2]}
            offset={[1, 1]}
            wrapT={THREE.RepeatWrapping}
            wrapS={THREE.RepeatWrapping}
            encoding={THREE.sRGBEncoding}
          />
        </meshPhysicalMaterial>
      </mesh>
      <mesh position={[1, 0, 0]}>
        <planeGeometry />
        <meshPhysicalMaterial
          toneMapped={false}
          clearcoat={1}
          clearcoatRoughness={0}
          side={THREE.FrontSide}
        >
          <videoTexture
            attach="map"
            args={[video2]}
            flipY={false}
            repeat={[-1, -1]}
            offset={[1, 1]}
            wrapT={THREE.RepeatWrapping}
            wrapS={THREE.RepeatWrapping}
            encoding={THREE.sRGBEncoding}
          />
        </meshPhysicalMaterial>
      </mesh>
    </>
  );
};
export const Videos2 = () => {
  const style = { width: "600px", height: "400px" };

  return (
    <Canvas style={style} camera={{ fov: 30, position: [0, 0, 5] }}>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={1} />
      <Video2 />
      <OrbitControls />
    </Canvas>
  );
};
