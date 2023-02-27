import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useAspect,
  useTexture,
  OrbitControls,
  useVideoTexture,
} from "@react-three/drei";
import * as THREE from "three";

export const Videos = () => {
  const style = { width: "600px", height: "400px", background: "#151520" };
  return (
    <Canvas style={style}>
      <VideosCase />
      <OrbitControls />
    </Canvas>
  );
};
const VideosCase = () => {
  const scale = useAspect(1920, 1080, 1);
  return (
    <mesh scale={scale}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url="bg.jpg" />}>
        <VideoMaterial url="drei.mp4" />
      </Suspense>
    </mesh>
  );
};

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
