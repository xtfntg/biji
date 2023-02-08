import React, { Suspense, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { useProgress, Html, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

const Floor = (props) => {
  /* const [ref] = usePlane(() => ({ ...props }), useRef()); */
  const texture = useLoader(TextureLoader, "./img/grid.png");
  return (
    <mesh receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const obstacles = [...Array(50)].map((_, i) => ({
  position: [(Math.random() - 0.5) * 25, 2 * i, (Math.random() - 0.5) * 25],
  args: [Math.random() * 10, Math.random() * 2, Math.random() * 5],
}));

function Obstacle({ args, position, ...props }) {
  /*   const [ref] = useBox(
    () => ({ args, mass: 1, position: position, ...props }),
    useRef()
  ); */

  return (
    <mesh castShadow receiveShadow>
      <boxGeometry args={[...args]} />
      <meshStandardMaterial />
    </mesh>
  );
}

const Obstacles = () => {
  return (
    <>
      {obstacles.map(({ position, args }, i) => (
        <Obstacle
          key={i}
          position={position}
          args={args}
          material={"ground"}
        ></Obstacle>
      ))}
    </>
  );
};

const Game = () => {
  return (
    <>
      <Floor rotation={[-Math.PI / 2, 0, 0]} />
      <Obstacles />
    </>
  );
};

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export const FollowCam = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#191E28" };
  return (
    <Canvas style={style}>
      <Suspense fallback={<Loader />}>
        <spotLight
          position={[2.5, 5, 5]}
          angle={Math.PI / 3}
          penumbra={0.5}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
        />
        <spotLight
          position={[-2.5, 5, 5]}
          angle={Math.PI / 3}
          penumbra={0.5}
          castShadow
          shadow-mapSize-height={2048}
          shadow-mapSize-width={2048}
        />
        <Game />
        <gridHelper />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};
