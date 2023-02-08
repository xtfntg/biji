import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { Vector3, Quaternion } from "three";

//WASD按键方向封面介绍 重新盖上
const Overlay = () => {
  const DivStyle = {
    color: "white",
    position: "absolute",
    left: "260px",
    top: "10px",
    fontFamily: "monospace",
    textShadow: "1px 1px 2px black",
  };
  return <div style={DivStyle}>Y,G,H,J 移动.</div>;
};

const useKeyboard = () => {
  const keyMap = useRef({});
  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyUp", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyUp", onDocumentKey);
    };
  });

  return keyMap.current;
};

const Ball = ({ floor }) => {
  const ref = useRef();
  const keyMap = useKeyboard();
  //新建向量，新建四元素, 角速度
  const v0 = useMemo(() => new Vector3(), []);
  const q = useMemo(() => new Quaternion(), []);
  const angularVelocity = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    keyMap["KeyY"] && (angularVelocity.x -= delta * 5);
    keyMap["KeyH"] && (angularVelocity.x += delta * 5);
    keyMap["KeyG"] && (angularVelocity.z += delta * 5);
    keyMap["KeyJ"] && (angularVelocity.z -= delta * 5);

    //从由 axis（轴） 和 angle（角度）所给定的旋转来设置该四元数。角速度 增量。向量的方向设置为和原向量相同
    q.setFromAxisAngle(angularVelocity, delta).normalize();
    //运行钩子 当前 添加四元素q
    ref.current.applyQuaternion(q);
    //角速度差值 向量 0.01
    angularVelocity.lerp(v0, 0.01);

    //地面 当前定位 +=角速度z    //地面 当前定位 -=角速度x
    floor.current.position.x += angularVelocity.z * delta;
    floor.current.position.z -= angularVelocity.x * delta;
    //地面 当前定位 +=角速度z    //地面 当前定位x 角速度%10
    floor.current.position.x = floor.current.position.x % 10;
    floor.current.position.z = floor.current.position.z % 10;
  });
  return (
    <mesh position-y={1.0} ref={ref}>
      <sphereGeometry />
      <meshNormalMaterial wireframe />
    </mesh>
  );
};

export const Roller = () => {
  const ref = useRef();
  const style = { width: "600px", height: "400px", backgroundColor: "#2b1216" };
  return (
    <>
      <Canvas
        style={style}
        camera={{ position: [0, 2.5, 2.5] }}
        onCreated={({ camera }) => camera.lookAt(0, 1, 0)}
      >
        <gridHelper ref={ref} args={[100, 100]} />
        <Ball floor={ref} />
      </Canvas>
      <Overlay />
    </>
  );
};
