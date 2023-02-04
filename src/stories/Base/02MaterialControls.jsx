import React from "react";
/* import * as PropTypes from "prop-types"; */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/*1.2, 2.2添加参数 */
export const MaterialControls = ({
  ambientLightIntensity,
  directionalLightIntensity,
  pointLightIntensity,
  pointLightcolor,
  anchor,
  ...props
}) => {
  const style = { width: "600px", height: "400px", backgroundColor: "#0eb0c9" };

  return (
    <Canvas style={style} camera={{ fov: 70, position: [8, 8, 8] }} shadows>
      {/* 2.1灯光强度 颜色 属性 */}
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[2.5, 8, 5]}
        intensity={1}
        shadow-mapSize={1024}
        color={"#7e1671"}
      />
      <pointLight
        intensity={1.5}
        position={[10, 10, 10]}
        /* color={"#20894d"} */
        color={pointLightcolor}
      />
      {/* 1.1 比例选择锚 轴来调节物体大小*/}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"#5e616d"} />
      </mesh>
      <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#36282b"} />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};
