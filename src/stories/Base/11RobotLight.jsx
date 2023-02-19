import * as THREE from "three";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  Text,
  OrbitControls,
  Environment,
  Effects,
  Loader,
  useTexture,
  useGLTF,
  Detailed,
  AdaptiveDpr,
} from "@react-three/drei";

import {
  EffectComposer,
  SSAO,
  Bloom,
  DepthOfField,
  Noise,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";

import {
  BlurPass,
  Resizer,
  KernelSize,
  BlendFunction,
  GlitchMode,
} from "postprocessing";

import {
  RectAreaLightUniformsLib,
  FlakesTexture,
  NodeShaderStage,
} from "three-stdlib";

/* 矩形区域光制服库 */
RectAreaLightUniformsLib.init();
/* 向量.原型 对象字符串比较= .v.无限大小*/
THREE.Vector2.prototype.equals = function (v, epsilon = 0.001) {
  /* 数字的绝对值() <无限大小&&数字的绝对值()<无限大小*/
  return Math.abs(v.x - this.x) < epsilon && Math.abs(v.y - this.y) < epsilon;
};

const Lights = () => {
  const lights = useRef();
  const mouse = useLerpedMouse();
  useFrame((state) => {
    lights.current.rotation.x = (mouse.current.x * Math.PI) / 2;
    lights.current.rotation.y =
      Math.PI * 0.25 - (mouse.current.y * Math.PI) / 2;
  });
  return (
    <>
      <directionalLight
        intensity={1}
        position={[2, 2, 0]}
        color="red"
        distance={5}
      />
      <spotLight
        intensity={2}
        position={[-5, 10, 2]}
        angle={0.2}
        penumbra={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <group ref={lights}>
        <rectAreaLight
          intensity={2}
          position={[4.5, 0, -3]}
          width={10}
          height={10}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />

        <rectAreaLight
          intensity={2}
          position={[-10, 2, -10]}
          width={15}
          height={15}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </group>
    </>
  );
};
/* 使用勒索的鼠标 */
function useLerpedMouse() {
  /* 鼠标 = 使用three (状态 = 状态.鼠标)*/
  const mouse = useThree((state) => state.mouse);
  /* 勒索 = 使用活动对象. 鼠标.克隆*/
  const lerped = useRef(mouse.clone());
  /* 以前 = 新建 向量 */
  const previous = new THREE.Vector2();
  /* 使用框架 (状态)*/
  useFrame((state) => {
    /* 以前 = 克隆(勒索.目前) */
    previous.copy(lerped.current);
    /* 勒索.目前 .插值(鼠标) */
    lerped.current.lerp(mouse, 0.1);
    /* !以前.对象字符串比较 .(勒索 目前) 状态.性能.残值*/
    if (!previous.equals(lerped.current)) state.performance.regress();
  });
  /* 返回 勒索 */
  return lerped;
}

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
  const mouse = useLerpedMouse();
  useFrame((state) => {
    ref.current.rotation.y = (mouse.current.x * Math.PI) / 10;
    ref.current.rotation.x = (mouse.current.y * Math.PI) / 200;
  });
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

function Effect() {
  return (
    /*效果合成器 多重采样 禁用正常通行证 */
    <EffectComposer multisampling={0} disableNormalPass={true}>
      {/* 绽放效果 */}
      <Bloom
        kernelSize={KernelSize.LARGE}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.2}
      />
    </EffectComposer>
  );
}

export function RobotLight() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#c6dfc8",
  };
  return (
    <Canvas
      style={style}
      shadows
      dpr={[1, 2]}
      performance={{ min: 0.1 }}
      gl={{ alpha: false, antialias: false }}
      camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 1000 }}
    >
      <color attach="background" args={["lightblue"]} />
      <fog attach="fog" args={["#000", 0.9, 1]} />

      <Lights />
      <Suspense fallback={null}>
        <YBot position={[0, -1.3, 0]} />
        <Text
          position={[0, 1, -0.2]}
          fontSize={0.5}
          color="white"
          font="/noto.woff"
          material-fog={false}
          letterSpacing={-0.1}
        >
          群魔大典
        </Text>
      </Suspense>
      <mesh scale={4} position={[0, 1, -0.25]}>
        <planeGeometry />
        <meshStandardMaterial
          color="lightblue"
          toneMapped={false}
          fog={false}
          envMapIntensity={0}
        />
      </mesh>
      <Effect />
      <OrbitControls />
    </Canvas>
  );
}
