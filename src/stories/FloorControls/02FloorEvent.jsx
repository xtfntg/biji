import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//2.1创建控件
const UseControls = () => {
  var state = "idle";
  //2.2控件装态
  let [controls, setControls] = useState(false);
  const [hovered, setHover] = useState({});
  //2.3创建效果组件
  useEffect(() => {
    //2.4点击鼠标事件状态是指针向下
    const onMouseDown = (e) => {
      console.log();
    };
    //2.5点击鼠标事件抬起状态
    /*   const onMouseUp = (e) => {
      setControls((controls) => ({
        ...controls,
        controls: true,
      }));
    }; */
    //2.6鼠标移动事件
    /*  const onMouseMove = (e) => {
      setControls((controls) => ({
        ...controls,
        controls: true,
      }));
    }; */
    //window.addEventListener("mousedown", onMouseDown);
    /* window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove); */
    return () => {
      // window.removeEventListener("mousedown", onMouseDown);
      /*  window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove); */
    };
  }, []);
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
    <Canvas
      onClick={alert(11111111)}
      style={style}
      camera={{ fov: 75, position: [0, 1, 7] }}
      shadows
    >
      <ambientLight intensity={0.1} />
      <pointLight
        position={[0, 2, 0]}
        color={"#fff"}
        intensity={1}
        distance={100}
      />
      <FloorMesh />
      <Ring />
      <UseControls />
    </Canvas>
  );
};