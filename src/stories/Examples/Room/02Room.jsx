import * as THREE from "three";
import { SpotLightHelper, PointLightHelper } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useTexture,
  useHelper,
  Environment,
  Html,
} from "@react-three/drei";
import {
  MarbleMaterial,
  WoodMaterial,
  ClothMaterial,
  LatexPaintMaterial,
  SelfLuminousMaterial,
} from "./Texture";

import { CubeTextureLoader } from "three";
import ModalUi from "./ModalUi";
/* import TopSection from "./TopSection"; */
import Home from "./Home";
import styled from "styled-components";

function Cube(props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load("denim/denimDiff.jpg")}
        normalMap={new THREE.TextureLoader().load("denim/denimRough.jpg")}
      />
    </mesh>
  );
}

function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    "Park2/posx.jpg",
    "Park2/negx.jpg",
    "Park2/posy.jpg",
    "Park2/negy.jpg",
    "Park2/posz.jpg",
    "Park2/negz.jpg",
  ]);
  scene.background = texture;
  return null;
}
function TVgui({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./homes/TVgui.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.TVgui.geometry}
        material={WoodMaterial.DarkGreyWoodGrain}
      />
      <Html>
        <ModalUi />
      </Html>
    </group>
  );
}

function TV({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./homes/TV.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.TV_1.geometry} material={materials.shuLiao} />
      <mesh geometry={nodes.TV_2.geometry} material={materials.huanMian} />
      <Html>
        <ModalUi />
      </Html>
    </group>
  );
}

function BjeJin({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./homes/bieJin.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.biejin.geometry}
        material={MarbleMaterial.JazzWhiteProps}
      />
      <mesh
        geometry={nodes.biejin_1.geometry}
        material={SelfLuminousMaterial.SelfLuminous}
      />
    </group>
  );
}

function Ding({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./homes/ding.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.ding_1.geometry}
        material={LatexPaintMaterial.WhiteLatexPaint}
      />
      <mesh
        geometry={nodes.ding_2.geometry}
        material={LatexPaintMaterial.BlackLatexPaint}
      />
      <mesh geometry={nodes.ding_3.geometry} material={materials.yiShuQi} />
    </group>
  );
}

function ShaFei({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./homes/shaFei.glb");

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.shaFei_1.geometry}
        material={ClothMaterial.DarkGreenFabric}
      />
      <mesh
        geometry={nodes.shaFei_2.geometry}
        material={WoodMaterial.DarkGreyWoodGrain}
      />
      <mesh
        geometry={nodes.shaFei_3.geometry}
        material={ClothMaterial.CrimsonFabric}
      />
    </group>
  );
}

function House(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF("./homes/homes.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.homes_1.geometry}
        material={MarbleMaterial.ItalianGrey}
      />
      <mesh
        geometry={nodes.homes_2.geometry}
        material={LatexPaintMaterial.WhiteLatexPaint}
      />
      <mesh
        geometry={nodes.homes_3.geometry}
        material={LatexPaintMaterial.DarkGrayLatexPaint}
      />
      <Html>
        <ModalUi />
      </Html>
    </group>
  );
}

function SpotLight() {
  const spotLight = useRef();
  const { scene } = useThree();
  /*  useHelper(spotLight, SpotLightHelper, "teal"); */

  useEffect(() => {
    scene.add(spotLight.current.target);
  });
  return (
    <spotLight
      ref={spotLight}
      color="#fdf2d3"
      castShadow
      /*  shadow-mapSize-width={1024}
        shadow-mapSize-height={1024} */
      shadow-mapSize={[1024, 1024]}
      shadow-camera-near={1}
      shadow-camera-far={1000}
      shadow-camera-fov={1}
      position={[0, 2.53, -1.45]}
      intensity={6}
      distance={3}
      angle={0.4}
      penumbra={0.8}
      decay={1}
      focus={1}
      target-position={[0, -Math.PI * 12, 0]}
    />
  );
}
function Lights() {
  const pointLight = useRef();
  const rectAreaLight = useRef();
  const { scene } = useThree();

  /*   useHelper(pointLight, PointLightHelper, 0.5, "hotpink"); */
  /* useHelper(rectAreaLight, RectAreaLightHelper, 1, "red"); */
  /* useEffect(() => {
    scene.add(pointLight.current.target);
  }); */
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={1}
        position={[2, 1, 0]}
        color="#fdf2d3"
        distance={5}
      />

      <rectAreaLight
        ref={rectAreaLight}
        color="#e1fdff"
        intensity={10}
        position={[-6, 2, 0]}
        rotationX={Math.PI / 2}
        width={4}
        height={3}
        onUpdate={(self) => self.lookAt(0, 0, 0)}
      />
    </>
  );
}
/* export const App3DHome = styled.div`
  width: 600px;
  height: 400px;
`; */
/*   <App3DHome> /*  </App3DHome> */
export function Room() {
  const style = { width: "600px", height: "400px" };
  return (
    <>
      <Home />
      <Canvas
        shadowMap
        camera={{ fov: 75, near: 0.001, far: 1000, position: [0, 0, 0.1] }}
        style={style}
      >
        <Lights />
        <SpotLight />
        <Suspense fallback={null}>
          {/*  <Cube position={[2, 0, 0]} />
      <Cube position={[-2, 0, 0]} /> */}
          <House receiveShadow />
          <ShaFei position={[-0.3, 0, 1.45]} castShadow />
          <BjeJin position={[0.5, 0, -1.63]} castShadow />
          <Ding position={[0, 2.339, 0]} castShadow />
          <TV position={[0.1, 0.7, -1.623]} />
          <TVgui position={[0, 0, -1.31]} castShadow />
        </Suspense>
        <SkyBox />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </>
  );
}
