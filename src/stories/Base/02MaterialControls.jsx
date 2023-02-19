import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, extend, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Effects,
  Loader,
  useTexture,
  useGLTF,
} from "@react-three/drei";

/*2)调用TextureLoader(纹理加载器)*/
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { RectAreaLightUniformsLib, FlakesTexture } from "three-stdlib";
/*
 *LUT（查找表） 是一种用于更改图像颜色的滤色器
 *对伽马、对比度、饱和度、亮度和色调进行调整，本质上是采用原始颜色集并将它们更改为新的颜色集。
 *提升色彩校正和色彩分级工作的
 */
/*LUT通行证 */
import { LUTPass } from "three/examples/jsm/postprocessing/LUTPass";
/*LUT 多维数据集加载器 */
import { LUTCubeLoader } from "three/examples/jsm/loaders/LUTCubeLoader";
/* 扩展 LUT通行证 */
extend({ LUTPass });

/*等级 */
function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, "/cubicle-99.CUBE");
  return (
    /* Effects(效果) children(儿子辈){attachArray(附加数组)=通行证  lut={3D纹理}}*/
    <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
  );
}

function Box(props) {
  /*1).drei useTexture(使用纹理 )的方法*/
  const texture = useTexture("/pk2s6e.jpg");

  /*2)fiber useLoader(使用加载)( 纹理加载器,路径) 的方法*/
  const colorMap = useLoader(TextureLoader, "/pr0f7g.jpg");
  /*2)声明原码写法 */
  const red = new THREE.MeshLambertMaterial({ map: colorMap });

  /*3)drei与声明原码写法 */
  const MarbleProps = useTexture({
    map: "Marble062_COL_2K.jpg",
    displacementMap: "Marble062_GLOSS_2K.jpg",
    normalMap: "Marble062_NRM_2K.jpg",
    roughnessMap: "Marble062_REFL_2K.jpg",
  });
  /*3)使用MarbleProps */
  const marble = new THREE.MeshLambertMaterial({ ...MarbleProps });

  /*4)drei与声明原码写法加****二级路径写法 ****/
  const DenimProps = useTexture({
    map: "./denim/denimDiff.jpg",
    displacementMap: "./denim/denimDisp.png",
    normalMap: "./denim/denimRough.jpg",
  });
  /*4)使用DenimProps */
  const Denim = new THREE.MeshLambertMaterial({ ...DenimProps });

  const sphere = new THREE.SphereGeometry(0.5, 32, 28);
  return (
    <>
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />
        {/*1).材质加载 */}
        <meshPhysicalMaterial
          envMapIntensity={0.4}
          map={texture}
          clearcoat={0.8}
          clearcoatRoughness={0}
          roughness={1}
          metalness={0}
        />
      </mesh>
      {/*2).材质加载 */}
      <mesh position={[-1.2, 0, 0]} geometry={sphere} material={red} />
      {/*3).材质加载 */}
      <mesh position={[2.5, 0, 0]} geometry={sphere} material={marble} />
      {/*4).材质加载 */}
      <mesh position={[-2.8, 0, 0]} geometry={sphere} material={Denim} />
    </>
  );
}
/*5).加载模型 Shoe(旅游鞋)*/
function Shoe(props) {
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
  const { nodes, materials } = useGLTF("/shoe-draco.glb");

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry}>
        <meshStandardMaterial metalness={1} roughness={0.1} color={"red"} />
      </mesh>
      <mesh geometry={nodes.shoe_1.geometry}>
        <meshStandardMaterial metalness={1} roughness={0.1} color={"#EF820D"} />
      </mesh>
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
}

export function MaterialControls() {
  const style = { width: "600px", height: "400px", backgroundColor: "#C7EA46" };
  return (
    <>
      <Canvas
        style={style}
        camera={{ fov: 25, near: 0.1, far: 1000, position: [2, 0, 15] }}
        frameloop="demand"
        dpr={[1, 2]}
      >
        <spotLight
          intensity={2}
          angle={0.2}
          penumbra={1}
          position={[5, 15, 10]}
        />

        <Suspense fallback={null}>
          <Box />
          <Grading position={[-10, -0.2, 0]} />
          {/* 5).加载模型 Shoe(旅游鞋) */}
          <Shoe position={[-4.5, -0.2, 0]} scale={1} rotation={[0, -1.5, 0]} />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
}
