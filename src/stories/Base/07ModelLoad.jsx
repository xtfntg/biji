/*********模型加载4种方法  缺陷：模型4个同步加载 剪切其中组件再粘贴组件 *************/
import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Effects,
  Loader,
  useTexture,
  useGLTF,
} from "@react-three/drei";

import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Mesh } from "three";

import { RectAreaLightUniformsLib, FlakesTexture } from "three-stdlib";

/*1).新建几何体*/
function Box(props) {
  const texture = useTexture("/pk2s6e.jpg");
  return (
    <>
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />

        <meshPhysicalMaterial
          envMapIntensity={0.4}
          map={texture}
          clearcoat={0.8}
          clearcoatRoughness={0}
          roughness={1}
          metalness={0}
        />
      </mesh>
    </>
  );
}
/*2).加载模型 Shoe(旅游鞋)*/
function Shoe(props) {
  const { nodes, materials } = useGLTF("/shoe-draco.glb");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
}

/*4).加载模型 YBot(机器人)模型+材质*/
function YBot(props) {
  const ref = useRef();
  const [texture] = useState(
    () =>
      new THREE.CanvasTexture(
        new FlakesTexture(),
        THREE.UVMapping,
        THREE.RepeatWrapping,
        THREE.RepeatWrapping
      )
  );
  const { nodes, materials } = useGLTF("/untitled-draco2.glb");
  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Alpha_Surface.geometry}>
        <meshStandardMaterial
          metalness={0.4}
          roughness={0.2}
          color={materials.Alpha_Body_MAT.color}
          normalMap={texture}
          normalMap-repeat={[35, 35]}
          normalScale={[0.15, 0.15]}
        />
      </mesh>
      <mesh castShadow geometry={nodes.Alpha_Joints.geometry}>
        <meshStandardMaterial
          metalness={1}
          roughness={0.1}
          color={materials.Alpha_Joints_MAT.color}
        />
      </mesh>
    </group>
  );
}

export function ModelLoad() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#0f1808",
  };
  return (
    <>
      <Canvas
        style={style}
        camera={{ fov: 25, near: 0.1, far: 1000, position: [0, 0, 8] }}
        frameloop="demand"
        dpr={[1, 2]}
      >
        <spotLight
          intensity={2}
          angle={0.2}
          penumbra={1}
          position={[5, 15, 10]}
        />

        <Suspense fallback={<span>loading...</span>} />
        {/* 1).新建几何体 */}
        <Box />
        {/* 2).加载后模型(旅游鞋) */}
        <Shoe position={[-1, -0.2, 0]} scale={0.5} rotation={[0, -1.5, 0]} />
        <Shoe
          position={[1, -0.2, 0]}
          scale={-0.5}
          rotation={[0, -1.5, Math.PI]}
        />
        {/* 3).加载模型 (远处石膏像) */}
        <Suspense fallback={<Model url="/bust-lo-draco.glb" />}>
          {/* 3).加载模型 (近处石膏像) */}
          <Model url="/bust-hi.glb" />
          {/* *4).加载模型 YBot(机器人)模型+材质 */}
          <YBot position={[-1.6, -0.5, 0]} />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
}

/*3).加载模型 (近实远需石膏像)*/
function Model({ url, ...props }) {
  // useGLTF 加载组件
  const { scene } = useGLTF(url);
  // 模型可用
  return (
    <primitive
      object={scene}
      {...props}
      scale={0.2}
      position={[2, -0.5, 0]}
      rotation={[0, -1.2, 0]}
    />
  );
}
