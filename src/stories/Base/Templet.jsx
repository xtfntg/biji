import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import { PointLightHelper, DirectionalLightHelper, Vector2 } from "three";
function CreateSphere() {
  let radius = 4;
  let pos = { x: 15, y: radius, z: -15 };
  return (
    <mesh
      position={[pos.x, pos.y, pos.z]}
      castShadow
      receiveShadow
      userData-draggable={true}
      userData-name="SPHERE"
    >
      <sphereBufferGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial color={0x43a1f4} />
    </mesh>
  );
}
function CreateBox() {
  let scale = { x: 6, y: 6, z: 6 };

  let pos = { x: 15, y: scale.y / 2, z: 15 };
  return (
    <mesh
      position={[pos.x, pos.y, pos.z]}
      scale={[scale.x, scale.y, scale.z]}
      castShadow
      receiveShadow
      userData-draggable={true}
      userData-name="BOX"
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={0xf9c834} />
    </mesh>
  );
}

function CreateFloor() {
  let pos = { x: 0, y: -1, z: 3 };
  let scale = { x: 100, y: 2, z: 100 };
  return (
    <mesh
      position={[pos.x, pos.y, pos.z]}
      scale={[scale.x, scale.y, scale.z]}
      castShadow={true}
      receiveShadow={true}
      userData-ground={true}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={0xf9c834} />
    </mesh>
  );
}

function CreateCylinder() {
  let radius = 4;
  let height = 6;
  let pos = { x: -15, y: height / 2, z: 15 };
  return (
    <mesh
      position={[pos.x, pos.y, pos.z]}
      castShadow
      receiveShadow
      userData-draggable={true}
      userData-name="CYLINDER"
    >
      <cylinderBufferGeometry args={[radius, radius, height, 32]} />
      <meshPhongMaterial color={0x90ee90} />
    </mesh>
  );
}

const PointLight = () => {
  const ref = useRef();
  useHelper(ref, PointLightHelper, 1);
  return (
    <pointLight ref={ref} args={[`white`, 1, 100]} position={[-5, 5, 5]} />
  );
};

const DirectionalLight = () => {
  const ref = useRef();
  useHelper(ref, DirectionalLightHelper, 50);
  return (
    <directionalLight
      ref={ref}
      intensity={1}
      color={"#fff"}
      position={[-30, 50, -30]}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-left={-70}
      shadow-camera-right={70}
      shadow-camera-top={70}
      shadow-camera-bottom={-70}
    />
  );
};
export const Templet = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#eaad1a" };
  return (
    <Canvas
      style={style}
      shadows
      scene={{ color: "red" }}
      camera={{
        fov: 30,
        near: 0.1,
        far: 1500,
        position: [-30, 70, 100],
        /*  lookat: new THREE.Vector3(0, 0, 0), */
      }}
    >
      {/*  <DragObject /> */}
      <color attach="background" args={["#131E3a"]} />
      <ambientLight intensity={0.2} color={"#fff"} />
      <DirectionalLight />
      <PointLight />
      <CreateFloor />
      <CreateBox />
      <CreateSphere />
      <CreateCylinder />
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.25}
        rotateSpeed={0.4}
        keyPanSpeed={0.4}
        screenSpacePanning={true}
        zoomSpeed={0.6}
        enablePan={true}
        panSpeed={0.4}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        minDistance={-500}
        maxDistance={1000}
      />
    </Canvas>
  );
};
