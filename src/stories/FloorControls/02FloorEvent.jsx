import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//2.1创建控件
const useControls = () => {
  //2.2控件装态
  let [controls, setControls] = useState({});
  //2.3创建效果组件
  useEffect(() => {});
  return controls;
};

const Ring = () => {
  //1.1 视口
  const { viewport } = useThree();
  //1.2 使用信息钩子
  const ref = useRef();
  //1.4 使用框架  鼠标
  useFrame(({ mouse }) => {
    /*  const x = (mouse.x / viewport.width) * 2 - 1;
    const y = (mouse.y / viewport.width) * 2 + 1; */
    //1.4 x y的位置  鼠标X*视口.高/2  鼠标y*视口.宽/2
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    //1.5物体信息当前位置.
    ref.current.position.set(x, y, 0);
    ref.current.rotation.set(-y, x, 0);
  });

  return (
    // 1.3 物体添加信息钩子
    <mesh ref={ref} rotation={[Math.PI / -2, 0, 0]} position={[0, 0.01, 0]}>
      <ringBufferGeometry args={[0.3, 0.36, 64]} />
      <meshBasicMaterial
        color={"#fff"}
        transparent={true}
        opacity={0.5}
        //visible={false}
        visible={true}
      />
    </mesh>
  );
};

const FloorMesh = () => {
  return (
    <mesh rotation={[Math.PI / -2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color={"#5555ff"} />
    </mesh>
  );
};

export const FloorEvent = () => {
  const style = {
    width: "500px",
    height: "400px",
    background: "#000",
    cursor: "pointer",
  };
  return (
    <Canvas style={style} camera={{ fov: 75, position: [0, 1, 7] }} shadows>
      <ambientLight intensity={0.1} />
      <pointLight
        position={[0, 2, 0]}
        color={"#fff"}
        intensity={1}
        distance={100}
      />
      <FloorMesh />
      <Ring />
    </Canvas>
  );
};
