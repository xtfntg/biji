import * as THREE from "three";
import React, { Fragment, Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";

const material = {
  inner: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#eF5C00").convertSRGBToLinear(),
    transparent: true,
    side: THREE.BackSide,
    transmission: 0.5,
    metalness: 1,
    roughness: 0,
  }),
  outer: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#5E2C00").convertSRGBToLinear(),
    transparent: true,
    transmission: 0.7,
    metalness: 1,
    roughness: 0,
  }),
  cap: new THREE.MeshStandardMaterial({ color: new THREE.Color("#040404") }),
  liquid: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("black"),
    transparent: true,
    transmission: 0.5,
  }),
};
function Bottles({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/draco.glb");
  return (
    <group ref={group} {...props} dispose={null} scale={[10, 10, 10]}>
      <group
        position={[0.42, 0, -1.93]}
        rotation={[Math.PI / 2, 0, 2.99]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled078.geometry}
          material={material.inner.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled078_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled078_2.geometry}
          material={materials["default"]}
        />
      </group>
      <group
        position={[0.91, 0, -1.91]}
        rotation={[Math.PI / 2, 0, 3.11]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled018.geometry}
          material={material.inner.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled018_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled018_2.geometry}
          material={materials["default"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.aesop_GLBC001.geometry}
        material={materials["default"]}
        rotation={[Math.PI / 2, 0, 2.88]}
        scale={0.01}
      />
      <group
        position={[-0.81, 0, -1.93]}
        rotation={[Math.PI / 2, 0, 2.96]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled052.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled052_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled052_2.geometry}
          material={materials["default"]}
        />
      </group>
      <group
        position={[-0.18, 0, -1.81]}
        rotation={[Math.PI / 2, 0, 2.88]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled064.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled064_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled064_2.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled064_3.geometry}
          material={materials["default"]}
        />
      </group>
      <group
        position={[-1.21, 0, -1.9]}
        rotation={[Math.PI / 2, 0, -1.1]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled072.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled072_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled072_2.geometry}
          material={materials["default"]}
        />
      </group>
      <group
        position={[-1.52, 0, -1.9]}
        rotation={[Math.PI / 2, 0, 2.72]}
        scale={0.01}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled007.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled007_1.geometry}
          material={materials["default"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Untitled007_2.geometry}
          material={materials["default"]}
        />
      </group>
    </group>
  );
}

const geometry = {
  sphere: new THREE.SphereBufferGeometry(1, 32, 32),
};

export const materials = {
  sphere: new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D6CDC4"),
    transparent: true,
  }),
  inner: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#eF5C00").convertSRGBToLinear(),
    transparent: true,
    side: THREE.BackSide,
    transmission: 0.5,
    metalness: 1,
    roughness: 0,
  }),
};

function Sphere(props) {
  return (
    <mesh
      receiveShadow
      castShadow
      {...props}
      renderOrder={-2000000}
      geometry={geometry.sphere}
      material={material.sphere}
    />
  );
}

function Spheres() {
  const group = useRef();

  return (
    <group ref={group}>
      <Sphere position={[-40, 1, 10]} />
      <Sphere position={[-20, 10, -20]} scale={[10, 10, 10]} />
      <Sphere position={[40, 3, 5]} scale={[3, 3, 3]} />
      <Sphere position={[30, 0.75, 10]} scale={[0.75, 0.75, 0.75]} />
    </group>
  );
}

function Box(props) {
  const ref = useRef();
  return (
    <mesh {...props} ref={ref} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  );
}
export function CosmeticBottles() {
  const style = {
    width: "500px",
    height: "400px",
    background: "#000",
    cursor: "pointer",
  };
  return (
    <Fragment>
      <Canvas
        style={style}
        dpr={[1, 1.5]}
        shadows
        camera={{ position: [0, 200, 200], fov: 20 }}
      >
        <color attach="background" args={["#a0a0a0"]} />
        <spotLight
          penumbra={1}
          angle={0.35}
          castShadow
          position={[40, 80, 0]}
          intensity={1}
          shadow-mapSize={[256, 256]}
        />
        <Suspense fallback={null}>
          <group position={[0, 12, 0]}>
            <Box />
            <Spheres />
            <Bottles />
          </group>

          <Environment
            /*  background={false}
            files={["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]}
            path="skyb/" */
            preset="apartment"
          />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </Fragment>
  );
}
