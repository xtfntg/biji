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
        <span>注:使用记忆钩子 之前电脑记算过的不用再次计算</span>
        <br />
        <span>步骤: 🤸1加载useMemo🤸2添加记忆钩子</span>
      </p>
      <br />
    </Html>
  );
};

const useKeyboard = () => {
  const keyMap = useRef({});
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
  const ref = useRef();
  /* const keyMap = useKeyboard(); */
  const keyMap = props.keyMap;
  const [selected, setSelected] = useState(props.selected);
  useFrame((_, delta) => {
    /* keyMap["KeyA"] && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && (ref.current.position.z += 1 * delta); */
    keyMap["KeyA"] && selected && (ref.current.position.x -= 1 * delta);
    keyMap["KeyD"] && selected && (ref.current.position.x += 1 * delta);
    keyMap["KeyW"] && selected && (ref.current.position.z -= 1 * delta);
    keyMap["KeyS"] && selected && (ref.current.position.z += 1 * delta);
  });

  return (
    <mesh {...props} ref={ref} onPointerDown={() => setSelected(!selected)}>
      <boxGeometry />
      <meshMatcapMaterial color={"#ee4866"} wireframe={!selected} />
    </mesh>
  );
};

export const CustomHook = () => {
  const keyMap = useKeyboard();
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#856d72",
  };
  return (
    <Canvas style={style} camera={{ position: [1, 2, 3] }}>
      <HtmlContent />
      <Box position={[-1.5, 0.5, 0]} keyMap={keyMap} />
      <Box position={[0, 0.5, 0]} keyMap={keyMap} selected />
      <Box position={[1.5, 0.5, 0]} keyMap={keyMap} />
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper />
    </Canvas>
  );
};
