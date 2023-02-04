import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";

const Box = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshLambertMaterial color={"#ec4e8a"} />
    </mesh>
  );
};
const Camera = (props) => {
  const ref = useRef();
  const { setDefaultCamera } = useThree();
  useEffect(() => void setDefaultCamera(ref.current), []);
  useFrame(() => ref.current.updateMatrixWorld());
  return <perspectiveCamera ref={ref} {...props} />;
};

export const CameraEvent = () => {
  const style = {
    width: "600px",
    height: "400px",
    backgroundColor: "#8b614d",
  };
  return (
    <Canvas style={style} colorManagement>
      <pointLight
        castShadow
        intensity={10}
        position={[10, 10, 10]}
        color={"#7e1671"}
      />
      <Box />
      <Stats />
      <OrbitControls />
    </Canvas>
  );
};
