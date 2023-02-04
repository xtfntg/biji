import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

//1将 props 传递给子组件
//1.2读取子组件内部的参数展开 propsExpand= ({ position, rotation, scale })太多重复简写props
/* const propsExpand = ({ position, rotation, scale }) => {
  return (
    //1.3平时写法position={position} rotation={rotation} scale={scale} 因些简写写法{...props}
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[2, 2, 2]} />
      <meshMatcapMaterial color={0x00ff00} />
    </mesh>
  );
}; */

const HtmlContent = () => {
  const style = {
    height: "50px",
    padding: "3px",
    /*  borderRadius: "3px", */
    fontSize: "10px",
    border: "1px solid #888888",
    backgroundColor: "#36292f",
    color: "#f97d1c",
    lineHeight: "20px",
  };
  return (
    <Html style={style} fullscreen={true}>
      <p>
        <span>
          注: props是多种属性的简写(又名属性).传递参数 如:mesh中position,
          rotation, scale参数
        </span>
        <br />
        <span>
          步骤:
          🤸1.组件参数props🤸2.组件传导...props-🤸3.多个子组件,不同参数赋值
        </span>
      </p>
      <br />
    </Html>
  );
};

const Box = (props) => {
  return (
    <mesh {...props}>
      <boxGeometry args={[2, 2, 2]} />
      <meshMatcapMaterial color={0x00ff00} />
    </mesh>
  );
};

export const UseProps = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#856d72",
  };
  return (
    <Canvas
      style={style}
      camera={{ fov: 75, near: 0.1, far: 1000, position: [5, 5, 5] }}
    >
      <HtmlContent />
      {/*1.1传递两个道具 位置与大小*/}
      <Box position={[3, 0, 0]} scale={[2, 2, 2]} />
      <Box position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 4]} />
      <OrbitControls />
    </Canvas>
  );
};
