import React, { Suspense, useRef, useEffect, useState } from "react";
import {
  Canvas,
  useThree,
  useLoader,
  extend,
  useFrame,
} from "@react-three/fiber";
import { OrbitControls, PositionalAudio } from "@react-three/drei";
import * as THREE from "three";

//原生Three.js写法
const SoundUrl = ({ url }) => {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);
  return <positionalAudio ref={sound} args={[listener]} />;
};

export const Sound = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  const ref = useRef();

  return (
    <Canvas style={style}>
      <Suspense fallback={null}>
        <PositionalAudio ref={ref} autoplay loop url="/Blue.mp3" distance={3} />
        <mesh>
          <boxBufferGeometry attach="geometry" />
          <meshBasicMaterial attach="material" color="hotpink" />
          {/* <SoundUrl url="/Beyond.mp3" /> */}
        </mesh>
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};
