import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/* const positionsA = [...Array(20)].map(() => ({
  position: [40 - Math.random() * 80, 5, 40 - Math.random() * 80],
  scale: [5 - Math.random() * 4, 10, 5 - Math.random() * 2],
}));
const positionsB = [...Array(20)].map(() => ({
  position: [40 - Math.random() * 80, 0.1, 40 - Math.random() * 80],
  scale: [2, 0.2, 2],
})); */

function PlaneCahedron({ time, ...props }) {
  return (
    <mesh
      receiveShadow
      castShadow
      {...props}
      onClick={(e) => {
        /* 停止传播 */
        e.stopPropagation();
        /* 原生事件.停止立即传播 */
        e.nativeEvent.stopImmediatePropagation();
        /* 原生事件.停止传播 */
        e.nativeEvent.stopPropagation();
        alert("点击成功");
      }}
      position={[20, 0, 0]}
    >
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
}

function Dodecahedron({ time, ...props }) {
  return (
    <mesh receiveShadow castShadow {...props}>
      <boxGeometry />
      <meshBasicMaterial color={"#000080"} />
    </mesh>
  );
}

function BuildScene() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshBasicMaterial color={"#fff200"} wireframe />
    </mesh>
  );
}

export function Array() {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#eaad1a",
  };
  return (
    <Canvas
      style={style}
      shadows
      camera={{ fov: 50, near: 0.01, far: 100000, position: [0, 30, 10] }}
      raycaster={{
        /* 线精度 */
        linePrecision: 5,
        /* 计算偏移量 */
        computeOffsets: ({ clientX, clientY }) => ({
          mouseX: (clientX / window.innerWidth) * 2 - 1,
          mouseY: -(clientY / window.innerHeight) * 2 + 1,
        }),

        filter: (intersects, state) => intersects.reverse(),
      }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <BuildScene />
      <PlaneCahedron />
      <Dodecahedron />
      {/*  {positionsA.map((props, i) => (
        <Dodecahedron key={i} {...props} />
      ))}
      {positionsB.map((props, i) => (
        <PlaneCahedron key={i} {...props} />
      ))} */}
      <OrbitControls
        /* 启用阻尼 */
        enableDamping={true}
        /* 阻尼系数*/
        dampingFactor={0.5}
        /* 旋转速度*/
        rotateSpeed={0.4}
        /* 键平移速度*/
        keyPanSpeed={0.4}
        /* 屏幕空间平移*/
        screenSpacePanning={true}
        /* 变焦速度*/
        zoomSpeed={0.6}
        /* 启用泛*/
        enablePan={true}
        /* 平移速度*/
        panSpeed={0.4}
        /* 最小极角*/

        minPolarAngle={-Math.PI / 1}
        /* 最大极角*/
        maxPolarAngle={Math.PI / 2}
        /* 最小距离*/
        minDistance={50}
        /* 最大距离*/
        maxDistance={1000}
      />
    </Canvas>
  );
}
