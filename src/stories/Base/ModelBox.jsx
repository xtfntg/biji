import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useControls } from "leva";

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
        <span>注:1.些案例控件运用了leva来控制。</span>
        <br />
        <span>
          使用 three函数成数组的方式切换形状 与react-three/fiber 更加灵活
        </span>
      </p>
      <br />
    </Html>
  );
};

const LoadModel = (props) => {
  const model = useGLTF("./ModelBox.glb");
  return <primitive object={model.scene} {...props} />;
};

export const ModelBox = () => {
  const style = { width: "600px", height: "400px" };
  const color = useControls({
    value: "#00c89c",
  });
  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: "lime" },
    };
  }, []);
  const pA = useControls("Polyhedron A", options);
  /*   const pB = useControls("Polyhedron B", options); */
  return (
    <Canvas style={style} camera={{ fov: 23, position: [-10, 50, 0] }} shadows>
      <HtmlContent />
      <color attach="background" args={[color.value]} />
      <ambientLight intensity={1} />
      <LoadModel
        position={[0, 0, 0]}
        rotation={[pA.x, pA.y, pA.z]}
        visible={pA.visible}
        color={pA.color}
      />

      <axesHelper args={[5]} />
      <OrbitControls />
    </Canvas>
  );
};
