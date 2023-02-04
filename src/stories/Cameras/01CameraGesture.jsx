import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

const Box = () => {
  return (
    <mesh>
      <boxGeometry />
      <meshLambertMaterial />
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

export const CameraGesture = () => {
  const style = { width: "600px", height: "400px", backgroundColor: "#00c89c" };
  return (
    <Canvas style={style} shadows colorManagement>
      <Camera position={[0, 0, 5]} />
      <Box />
    </Canvas>
  );
};
