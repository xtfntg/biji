import React from "react";
/* import * as PropTypes from "prop-types"; */
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

const HtmlP = (props) => {
  return <p {...props}>这是html文件在画布Canvas外的写法</p>;
};

export const LightControls = ({
  ambientLightIntensity,
  directionalLightIntensity,
  pointLightIntensity,
  pointLightcolor,
  ...props
}) => {
  const style = { width: "600px", height: "400px", backgroundColor: "#0eb0c9" };

  return (
    <>
      <HtmlP />
      <Canvas style={style} camera={{ fov: 70, position: [8, 8, 8] }} shadows>
        <Html position={[-0, -0, -0]} backgroundColor={"#c02c38"}>
          <div>
            <p>
              这是画布内标签
              <br />
              <span>occlude在Html是隐藏属性</span>
              <br />
              <span>transform跟随物体属性</span>
            </p>
          </div>
        </Html>
        {/* 2.1灯光强度 颜色 属性 */}
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={directionalLightIntensity}
          shadow-mapSize={1024}
          color={"#7e1671"}
        />
        <pointLight
          intensity={pointLightIntensity}
          position={[10, 10, 10]}
          /* color={"#20894d"} */
          color={pointLightcolor}
        />
        {/* 1.1 比例选择锚 轴来调节物体大小*/}
        <mesh receiveShadow castShadow>
          <boxGeometry />
          <meshStandardMaterial color={"#fff"} />
        </mesh>
        <mesh
          rotation={[Math.PI / -2, 0, 0]}
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={"#5e616d"} />
        </mesh>
        <OrbitControls />
      </Canvas>
    </>
  );
};
//道具类型
/* AddControls.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.string,
};
 */
/* LightControls.propTypes = {
  children: { table: { disable: true } },
  size: "small" | "medium" | "large",
  backgroundColor: { control: "color" },
};
 */
