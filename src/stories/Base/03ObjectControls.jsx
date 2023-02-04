import React from "react";
/* import * as PropTypes from "prop-types"; */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/*1.2, 2.2添加参数 */
export const ObjectControls = ({
  boxReceiveShadow,
  boxCastShadow,
  ...props
}) => {
  const style = { width: "600px", height: "400px", backgroundColor: "#806d9e" };

  return (
    <Canvas style={style} camera={{ fov: 70, position: [8, 8, 8] }} shadows>
      <pointLight
        castShadow
        intensity={10}
        position={[15, 10, 10]}
        color={"#20894d"}
      />
      {/* 1.1 比例选择锚 轴来调节物体大小*/}

      <mesh receiveShadow={boxReceiveShadow} castShadow={boxCastShadow}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"#5e616d"} />
      </mesh>
      <mesh
        position={[3, 2, 1]}
        castShadow={boxCastShadow}
        //customDepthMaterial={}
        //frustumCulled={false}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={"#3170a7"} />
      </mesh>
      <mesh rotation={[Math.PI / -2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={"#36282b"} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
};
