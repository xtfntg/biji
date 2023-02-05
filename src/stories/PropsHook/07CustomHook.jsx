import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

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
        <span>注:自定义钩子 </span>
        <br />
        <span>步骤: 🤸1加载useMemo🤸2添加记忆钩子</span>
      </p>
      <br />
    </Html>
  );
};
//使用键盘 副作用钩子
const useKeyboard = () => {
  //添加运行钩子 按键映射
  const keyMap = useRef({});
  //副作用钩子 在文件键  映射当前参数节点 = 参数类型 ===键按下
  useEffect(() => {
    const onDocumentKey = (e) => {
      keyMap.current[e.code] = e.type === "keydown";
    };
    document.addEventListener("keydown", onDocumentKey);
    document.addEventListener("keyup", onDocumentKey);
    return () => {
      document.removeEventListener("keydown", onDocumentKey);
      document.removeEventListener("keyup", onDocumentKey);
    };
  });
  return keyMap.current;
};

const Box = (props) => {
  //添加运行钩子
  const ref = useRef();
  //按键映射=使用键盘
  /* const keyMap = useKeyboard(); */
  //按键映射=属性.按键映射
  const keyMap = props.keyMap;
  //选择 使用选择 =使用状态（属性选择）
  const [selected, setSelected] = useState(props.selected);
  useFrame((_, delta) => {
    /* keyMap["KeyA"] && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && (ref.current.position.z += 1 * delta); */
    //渲染 按键映射[值ADWS]&选择&运行钩子当前位置-1
    keyMap["KeyA"] && selected && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && selected && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && selected && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && selected && (ref.current.position.z += 1 * delta);
  });

  return (
    //按下使用选择(不等于选择)
    <mesh {...props} ref={ref} onPointerDown={() => setSelected(!selected)}>
      <boxGeometry />
      {/* 框线不等于选择 */}
      <meshMatcapMaterial color={"#ee4866"} wireframe={!selected} />
    </mesh>
  );
};

export const CustomHook = () => {
  //按键映射=使用键盘
  const keyMap = useKeyboard();
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#856d72",
  };
  return (
    <Canvas style={style} camera={{ position: [1, 2, 3] }}>
      <HtmlContent />
      {/*按键映射=属性.按键映射*/}
      <Box position={[-1.5, 0.5, 0]} keyMap={keyMap} />
      <Box position={[0, 0.5, 0]} keyMap={keyMap} selected />
      <Box position={[1.5, 0.5, 0]} keyMap={keyMap} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
    </Canvas>
  );
};
